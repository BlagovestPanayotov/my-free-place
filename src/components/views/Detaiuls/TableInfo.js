import styles from './Details.module.css';


function TableInfo({ currentDestination }) {
    return (
        <table id={styles.form}>
            <tbody>
                <tr>
                    <td><label>Destination:</label></td>
                    <td><div id='destination'>{currentDestination.destination} </div></td>
                </tr>
                <tr>
                    <td><label>Countrey:</label></td>
                    <td><div id='country'>{currentDestination.country} </div></td>
                </tr>
                <tr>
                    <td><label>Image Url:</label></td>
                    <td><div id='imageUrl'>{currentDestination.imageUrl} </div></td>
                </tr>
                <tr>
                    <td><label>Description:</label></td>
                    <td><div id='description'>{currentDestination.description} </div></td>
                </tr>

            </tbody>
        </table>
    );
}

export default TableInfo;