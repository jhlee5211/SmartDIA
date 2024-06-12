import React, {useState} from 'react';
import styles from './Button.module.css';
import chroma from 'chroma-js';

const Button = ({color, text, scale}) => {
	const [isPressed, setIsPressed] = useState(false);

	const buttonStyle = {
		backgroundColor: isPressed ? chroma(color).set('hsl.h', '+3').darken(0.2).hex() : `#${color}`,
		transform: `scale(${scale})`
	};

	const handlePress = (pressed) => {
		setIsPressed(pressed);
	};

	return (
		<button
			className={`${styles.button} ${isPressed ? styles.pressed : ''}`}
			style={buttonStyle}
			onMouseDown={() => handlePress(true)}
			onMouseUp={() => handlePress(false)}
			onMouseLeave={() => handlePress(false)}
		>
			{text}
		</button>
	);
};

export default Button;
