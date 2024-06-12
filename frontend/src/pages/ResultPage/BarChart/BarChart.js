import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import {useAppState} from '../../../context/AppContext';

function BarChart() {
	const {state} = useAppState();
	const {data} = state;

	const containerStyle = {
		width: "100%", padding: "10px"
	};

	return (<div style={containerStyle}>
		{data.map((item, index) => (<div key={index}>
			<ProgressBar
				completed={item[1]}
				bgColor={['#9C9AFF', '#8EDB73', '#FBBE49', '#F38C8C', '#F4ADFF'][index % 5]}
				baseBgColor="#e6e6e6"
				labelColor="#ffffff"
				labelAlignment="right"
				labelSize="100%"
				height="5vh"
				borderRadius="50px"
				margin="1vh"
				transitionDuration="0.5s"
				transitionTimingFunction="ease-in-out"
				label={`${item[1]}% (${item[0]})`}
			/>
		</div>))}
	</div>);
}

export default BarChart;