import React from 'react';
import styles from './Container.module.css';
import Footer from '../Footer/Footer';

const Container = ({children}) => {
	return (<div className={styles.background}>
			<div className={styles.container}>
				{children}
			</div>
			<Footer/>
		</div>);
};

export default Container;
