import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getById } from '../../../services/data';

import CommentCart from './CommentCart';
import styles from './Details.module.css';


function Details({ currentDestination, loading, setCurrentDestinationIdHandler }) {

    const { destinationId } = useParams();
    setCurrentDestinationIdHandler(destinationId);

    return (
        <div className={styles.content}>
            {loading
                ? <h1>Loading...</h1>
                : <>
                    <h1><i>{currentDestination.destination}</i></h1>
                    <img src={currentDestination.imageUrl} alt={currentDestination.destination} />
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
                    <span>
                        <button >Like / Liked: 1</button>
                        <button>Edit</button>
                        <button>Delete</button>
                    </span>
                    <div id={styles.comments}>
                        <h4>Comments:</h4>
                        <div>
                            <CommentCart />
                            <CommentCart />
                            <CommentCart />
                        </div>
                    </div>
                </>
            }
        </div >
    );
}

export default Details;