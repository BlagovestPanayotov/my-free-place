import styles from './About.module.css';


function AboutPage() {
    return (
        <>
            <div className={styles.content}>
                <h1><i>Thank you for visiting my application</i></h1>
                <p>This application is created as proof of skils working with React js by Blagovest Panayotov.</p>
            </div>
        </>
    );
}

export default AboutPage;