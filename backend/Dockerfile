# Use the official Python image from the Docker Hub
FROM python:3.9

# Install Java (OpenJDK 17)
RUN apt-get update && apt-get install -y openjdk-17-jdk-headless

# Set environment variables
ENV JAVA_HOME /usr/lib/jvm/java-17-openjdk-amd64
ENV PATH $JAVA_HOME/bin:$PATH

# Create a directory for the app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run app.py when the container launches
CMD ["gunicorn", "-b", ":8080", "app:app"]
