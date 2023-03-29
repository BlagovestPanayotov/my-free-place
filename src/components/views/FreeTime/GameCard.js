import { useState } from 'react';
import { Snake } from '../../../games/Snake/Snake';
import styles from './FreeTime.module.css';


function GameCard({ name, imgUrl }) {
    const [openSnakeModal, setOpenSnakeModal] = useState(false);

    return (
        <>
            {openSnakeModal ? <Snake setOpenSnakeModal={setOpenSnakeModal}/> : null}
            <div className={styles.gameCard}>
                <h3>{name}</h3>
                <img src={imgUrl} alt={name} />
                <button onClick={() => setOpenSnakeModal(true)}>Play</button>
            </div>
        </>
    );
}

export default GameCard;