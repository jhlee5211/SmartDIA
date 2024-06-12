from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import glob

from konlpy.tag import Okt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

app = Flask(__name__)
CORS(app)

csv_files = glob.glob('./data/*.csv')

dataframes = []
for file in csv_files:
    df = pd.read_csv(file, header=None)
    df = df.iloc[:, 1:]
    dataframes.append(df)
combined_df = pd.concat(dataframes, axis=0, ignore_index=True)
combined_df.columns = ['label', 'data']

okt = Okt()


def preprocess_text(text):
    tokens = okt.morphs(text, stem=True)
    tokens = [token for token in tokens if token not in ['Josa', 'Eomi', 'Punctuation']]
    return tokens


combined_df['processed'] = combined_df['data'].apply(preprocess_text)

vectorizer = TfidfVectorizer(tokenizer=lambda x: x, lowercase=False)
tfidf_matrix = vectorizer.fit_transform(combined_df['processed'].apply(lambda x: ' '.join(x)))

X_train, X_test, y_train, y_test = train_test_split(tfidf_matrix, combined_df['label'], test_size=0.2, random_state=42)
model = LogisticRegression()
model.fit(X_train, y_train)

accuracy = model.score(X_test, y_test)
print(f'Accuracy: {accuracy * 100:.2f}%')


def predict_text_probabilities(text):
    preprocessed_text = preprocess_text(text)
    vectorized_text = vectorizer.transform([' '.join(preprocessed_text)])
    probabilities = model.predict_proba(vectorized_text)[0]
    probabilities_dict = dict(zip(model.classes_, probabilities))
    filtered_probabilities = {label: 0 if prob < 0.005 else prob for label, prob in probabilities_dict.items()}
    sorted_probabilities = sorted(filtered_probabilities.items(), key=lambda item: item[1], reverse=True)[:5]
    return dict(sorted_probabilities)


@app.route('/predict', methods=['POST'])
def predict():
    input_data = request.json.get('input', '')
    probabilities = predict_text_probabilities(input_data)
    probabilities_percentage = {label: round(prob * 100) for label, prob in probabilities.items()}
    return jsonify(probabilities_percentage)


if __name__ == "__main__":
    app.run(debug=True)
