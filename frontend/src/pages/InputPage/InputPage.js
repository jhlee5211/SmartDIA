import React, {useState} from 'react';
import {useAppState} from '../../context/AppContext';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import styles from './InputPage.module.css';

const backend = axios.create({
	baseURL: 'https://smartdia.uw.r.appspot.com/'
	//baseURL: 'https://smartdia.appspot.com/'
	//baseURL: 'http://localhost:5000/'
});

function InputPage() {
	const {dispatch} = useAppState();
	const [input, setInput] = useState('');
	const navigate = useNavigate();
	const maxLength = 250;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!input.trim()) {
			alert("입력을 확인해주세요.");
			return;
		}
		try {
			const {data} = await backend.post('predict', {input});
			dispatch({type: 'SET_DATA', payload: data});
			navigate('/result');
		} catch (error) {
			alert("백엔드 서버와 연결할 수 없습니다.");
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e);
		}
	};

	const handleInputChange = (e) => setInput(e.target.value.slice(0, maxLength));

	return (<div className={styles.container}>
		<img className={styles.nurseImage} src="/images/nurse.png" alt="nurse"/>
		<form className={styles.symptomContainer} onSubmit={handleSubmit}>
			<img className={styles.symptomImage} src="/images/patient.png" alt="patient"/>
			<div className={styles.symptomTextContainer}>
                    <textarea
	                    className={styles.symptomText}
	                    value={input}
	                    onChange={handleInputChange}
	                    onKeyDown={handleKeyDown}
	                    placeholder="증상을 입력해주세요"
	                    maxLength={maxLength}
                    />
				<div className={styles.symptomTextLength}>{input.length}/{maxLength}</div>
			</div>
		</form>
	</div>);
}

export default InputPage;
