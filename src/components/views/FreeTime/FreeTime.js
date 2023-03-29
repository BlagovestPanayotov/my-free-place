import styles from './FreeTime.module.css';
import GameCard from './GameCard';

function FreeTime() {


    return (
        <div className={styles.content}>
            <GameCard name={'Snake'} imgUrl={'/img/snakeGame.png'}  />
        </div>
    );
}

export default FreeTime;