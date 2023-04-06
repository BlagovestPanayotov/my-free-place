import { onBackClick } from '../../../utils/util';
import styles from './About.module.css';


function About({ navigate }) {
    return (
        <div className={styles.content}>
            <h1><i>Thank you for visiting my application</i></h1>
            <p>This application is created as proof of skills working with ReactJS by Blagovest Panayotov.</p>
            <button id={styles['back-btn']} onClick={e => onBackClick(e, navigate)}>Back</button>
        </div>
    );
}

export default About;