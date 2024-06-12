import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
	return (<div className={styles.footer}>
			<p className={styles.footerText}>Copyright (C) 2024 All rights reserved by SmartDIA.</p>
			<img className={styles.footerImage} src="/images/pcu_logo.png" alt="PCU logo"/>
		</div>);
};

export default Footer;
