import React, {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import Button from "../../components/Button/Button";
import styles from './PharmacyPage.module.css';

const {kakao} = window;

const PharmacyPage = () => {
	const mapRef = useRef(null);
	const [places, setPlaces] = useState([]);

	useEffect(() => {
		const initMap = () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(({coords}) => {
					const container = mapRef.current;
					const userPosition = new kakao.maps.LatLng(coords.latitude, coords.longitude);
					const map = new kakao.maps.Map(container, {center: userPosition, level: 3});
					const infowindow = new kakao.maps.InfoWindow({zIndex: 1});
					const ps = new kakao.maps.services.Places();

					new kakao.maps.Marker({
						map,
						position: userPosition,
						image: new kakao.maps.MarkerImage('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', new kakao.maps.Size(36, 37))
					});

					const searchPharmacies = () => {
						ps.categorySearch('PM9', (data, status) => {
							if (status === kakao.maps.services.Status.OK) {
								const sortedData = data.sort((a, b) => a.distance - b.distance).slice(0, 5);
								setPlaces(sortedData);
								displayPlaces(sortedData);
							}
						}, {location: map.getCenter(), radius: 5000});
					};

					const displayPlaces = (places) => {
						const bounds = new kakao.maps.LatLngBounds();
						places.forEach((place, index) => {
							const placePosition = new kakao.maps.LatLng(place.y, place.x);
							const marker = new kakao.maps.Marker({
								map,
								position: placePosition,
								image: new kakao.maps.MarkerImage('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', new kakao.maps.Size(36, 37), {
									spriteSize: new kakao.maps.Size(36, 691),
									spriteOrigin: new kakao.maps.Point(0, (index * 46) + 10),
									offset: new kakao.maps.Point(13, 37)
								})
							});
							kakao.maps.event.addListener(marker, 'mouseover', () => {
								infowindow.setContent(`<div style="padding:5px;z-index:1;">${place.place_name}</div>`);
								infowindow.open(map, marker);
							});
							bounds.extend(placePosition);
						});
						map.setBounds(bounds);
					};

					searchPharmacies();
				}, (error) => {
					console.error('Geolocation 오류:', error);
				});
			} else {
				console.error('위치 정보에 액세스 할 수 없습니다.');
			}
		};

		initMap();
	}, []);

	return (<div className={styles.container}>
		<div className={styles.mapContainer} ref={mapRef}></div>
		<div className={styles.infoContainer}>
			<div className={styles.placesList}>
				{places.map((place, index) => (<div key={index} className={styles.placeItem}>
					<h3>{place.place_name}</h3>
					<p>{place.road_address_name || place.address_name}</p>
					<p>{place.phone}</p>
					<p>{place.distance}m</p>
				</div>))}
				<div className={styles.buttonContainer}>
					<a href="https://map.kakao.com/link/search/약국" target="_blank" rel="noopener noreferrer">
						<Button color="A7DAFF" text="더보기" scale={1.0}></Button>
					</a>
					<Link to="/result">
						<Button color="8CBFFB" text="돌아가기" scale={1.0}></Button>
					</Link>
				</div>
			</div>
		</div>
	</div>);
};

export default PharmacyPage;
