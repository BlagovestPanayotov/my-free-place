import styles from './Catalog.module.css';
import DestinationCard from './DestinationCard';


function Catalog({ loading, destinations }) {
    return (
        <div className={styles.content}>
            {loading
                ? <h1>Loading...</h1>
                : destinations.map(x => <DestinationCard
                    key={x._id}
                    {...x}
                />)
            }
        </div>
    );
}

export default Catalog;