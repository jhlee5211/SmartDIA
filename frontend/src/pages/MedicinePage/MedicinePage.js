import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useAppState} from "../../context/AppContext";
import styles from './MedicinePage.module.css';
import Button from "../../components/Button/Button";

function MedicinePage() {
	const [item, setItem] = useState(null);
	const {state} = useAppState();
	const {data} = state;
	const largest = {label: data[0][0], value: data[0][1]};

	useEffect(() => {
		const fetchItem = async () => {
			const apiUrl = `https://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList?serviceKey=uGiieGeP8vL8hHelRk3fYeFiTv54BbTqDOzp7kU90J4sVZl8L3tmgy%2F2BvlzV%2BaG9AyN2xlNa0h3k8Z%2BJAS1vw%3D%3D&efcyQesitm=${largest.label}`;
			try {
				const response = await axios.get(apiUrl);
				const parser = new DOMParser();
				const xml = parser.parseFromString(response.data, 'application/xml');
				const randomIndex = Math.floor(Math.random() * xml.getElementsByTagName("itemName").length);
				const newItem = {
					name: xml.getElementsByTagName('itemName')[randomIndex]?.textContent || '',
					efcyQesitm: xml.getElementsByTagName('efcyQesitm')[randomIndex]?.textContent || '',
					useMethodQestitm: xml.getElementsByTagName('useMethodQesitm')[randomIndex]?.textContent || '',
					atpnQesitm: xml.getElementsByTagName('atpnQesitm')[randomIndex]?.textContent || '',
					intrcQesitm: xml.getElementsByTagName('intrcQesitm')[randomIndex]?.textContent || '',
					seQesitm: xml.getElementsByTagName('seQesitm')[randomIndex]?.textContent || '',
					depositMethodQesitm: xml.getElementsByTagName('depositMethodQesitm')[randomIndex]?.textContent || '',
					image: xml.getElementsByTagName('itemImage')[randomIndex]?.textContent || ''
				};

				if (!newItem.name) {
					setItem(null);
				} else {
					setItem(newItem);
				}
			} catch (error) {
				console.error('API call error:', error);
				setItem(null);
			}
		};

		fetchItem();
	}, [largest.label]);

	if (!item) {
		return (<div className={styles.container} style={{
			textAlign: 'center',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center'
		}}>
			<p style={{fontSize: '5vw'}}>약품을 찾을 수 없어요.</p>
			<Link to="/result">
				<Button color="8CBFFB" text="돌아가기" scale={1.0}/>
			</Link>
		</div>);
	}

	return (<div className={styles.container}>
		<div className={styles.imageContainer}>
			<div className={styles.imageSubContainer}>
				<img className={styles.image} src={item.image} alt={item.name + ".png"}/>
			</div>
		</div>
		<div className={styles.infoContainer}>
			<div className={styles.infoTextContainer}>
				<span className={styles.info}> 제품명:<span className={styles.infoLabel}> {item.name}</span></span>

				<br></br>

				<span className={styles.info}> 효능/효과:
                        <span className={styles.infoLabel}> {item.efcyQesitm}</span>
                    </span>
				<br></br>
				<span className={styles.info}> 복용법:
                        <span className={styles.infoLabel}> {item.useMethodQestitm}</span>
                    </span>
				<br></br>
				<span className={styles.info}> 주의사항 1:
                        <span className={styles.infoLabel}> {item.atpnQesitm}</span>
                    </span>
				<br></br>
				<span className={styles.info}> 주의사항 2:
                        <span className={styles.infoLabel}> {item.intrcQesitm}</span>
                    </span>
				<br></br>
				<span className={styles.info}> 주의사항 3:
                        <span className={styles.infoLabel}> {item.seQesitm}</span>
                    </span>
				<br></br>
				<span className={styles.info}> 보관법:
                        <span className={styles.infoLabel}> {item.depositMethodQesitm}</span>
                    </span>
			</div>
			<div className={styles.infoButtonContainer}>
				<Link to="/result">
					<Button color="8CBFFB" text="돌아가기" scale={1.0} style={{alignSelf: 'flex-end'}}/>
				</Link>
			</div>
		</div>
	</div>);
}

export default MedicinePage;