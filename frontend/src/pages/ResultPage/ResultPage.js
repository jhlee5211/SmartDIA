import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useAppState} from '../../context/AppContext';
import PieChart from "./PieChart/PieChart";
import BarChart from "./BarChart/BarChart";
import Button from "../../components/Button/Button";
import Rating from 'react-rating-stars-component';
import Slider from 'react-slider';
import styles from './ResultPage.module.css';

function ResultPage() {
	const {state} = useAppState();
	const {data} = state;
	const [rating, setRating] = useState(5);

	const largest = {label: data[0][0], value: data[0][1]};

	return (<div className={styles.container}>
		<div className={styles.charts}>
			<div className={styles.pieChart}><PieChart/></div>
			<div className={styles.barChart}><BarChart/></div>
		</div>
		<div className={styles.description}>
			<div className={styles.largestValue}>
					<span className={styles.info}> {largest.value}% 확률로 <span
						className={styles.infoLabel}>{largest.label}</span>입니다. </span>
			</div>
			<hr></hr>
			<div className={styles.links}>
				<Link to="/">
					<Button color="F38C8C" text="처음으로" scale={1.0}></Button>
				</Link>
				<Link to="/medicine">
					<Button color="9C9AFF" text="추천 약" scale={1.0}></Button>
				</Link>
				<Link to="/pharmacy">
					<Button color="8EDB73" text="가까운 약국" scale={1.0}></Button>
				</Link>
			</div>
			<div className={styles.ratingSection}>
				<Rating
					count={5}
					value={rating}
					size={50}
					activeColor="#FBBE49"
					inactiveColor="#D9D9D9"
					onChange={(newRating) => {
						setRating(newRating);
					}}
				/>
				<Slider
					defaultValue={rating}
					min={0}
					max={5}
					step={1}
					onAfterEnd={(val) => setRating(val)}
				/>
				<div className={styles.ratingText}>결과가 만족스러우시다면 평점을 남겨주세요.</div>
			</div>
		</div>
	</div>);
}

export default ResultPage;
