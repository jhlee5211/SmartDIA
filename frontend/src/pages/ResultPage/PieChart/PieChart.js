import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {useAppState} from '../../../context/AppContext';
import 'chart.js/auto';

function PieChart() {
	const {state} = useAppState();
	const {data} = state;
	const chartData = {
		labels: data.map(item => item[0]), datasets: [{
			data: data.map(item => item[1]),
			backgroundColor: ['#9C9AFF', '#8EDB73', '#FBBE49', '#F38C8C', '#F4ADFF'],
			borderWidth: 0,
			hoverOffset: 20
		}]
	};

	const options = {
		maintainAspectRatio: false, plugins: {
			legend: {display: false}
		}, layout: {padding: {top: 10, bottom: 10, left: 10, right: 10}}, cutout: '30%'
	};

	return <Doughnut data={chartData} options={options}/>
}

export default PieChart;
