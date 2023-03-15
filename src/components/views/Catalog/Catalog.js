import styles from './Catalog.module.css';
import DestinationCard from './DestinationCard';


function Catalog() {
    return (
        <div className={styles.content}>
            <DestinationCard />
            <DestinationCard />
            <DestinationCard />
            <DestinationCard />
        </div>
    );
}

export default Catalog;