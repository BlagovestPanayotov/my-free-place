import { useContext, useEffect, useState } from 'react';

import style from './Home.module.css';
import FrontCart from './FrontCart';
import { UserContext } from '../../../contexts/UserContext';
import { getLastTwo } from '../../../services/data';

function HomePage() {
    const { user } = useContext(UserContext);
    const [lastDestinations, setLastDestinations] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        getLastTwo()
            .then(data => {
                setLastDestinations(data.results);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                throw err;
            });
    }, []);

    return (
        <>
            <div className={style.content}>
                <h1><i>Welcome to My Free Place</i></h1>
                <p>Free Place is made from you for you. Here is the place to share your favorite destinations. The only rule is the place to be free of charge. This can be your secret place where you spend time with youself or where you have fun with your friends. The place for a nice walk with your other half or just your favorite spot to lay on the towel and enjoy the sound of the waves.</p>
            </div>
            <div className={style['side-content']}>
                {loading
                    ? <>
                        <div className="loader"></div>
                        <div className="loader"></div>
                    </>
                    : lastDestinations.map(x => <FrontCart
                        user={user}
                        key={x.objectId}
                        {...x}
                    />)
                }
            </div>
        </>
    );
}

export default HomePage;