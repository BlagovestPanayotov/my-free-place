import style from './Home.module.css';
import FrontCart from './FrontCart';

function HomePage({ lastDestinations, loading }) {

    return (
        <>
            <div className={style.content}>
                <h1><i>Welocome to My Free Place</i></h1>
                <p>Free Place is made from you for you. Here is the place to share your favorite destinations. The only rule is the place to be free of charge. This can be your secret place where you spend time with youself or where you have fun with your friends, the plase for a nice walk with your other half or just your favorite spot to lay on the towel and enjoy the sound of the waves.</p>
            </div>
            <div className={style['side-content']}>
                {loading
                    ? <h1>Loading...</h1>
                    : lastDestinations.map(x => <FrontCart
                        key={x._id}
                        {...x}
                    />)
                }
            </div>
        </>
    );
}

export default HomePage;