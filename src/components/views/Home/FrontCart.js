import style from './Home.module.css';
import { NavLink } from 'react-router-dom';


function FrontCart() {
    return (
        <div className={style.frontCart}>
            <h3>Destination</h3>
            <img src="./img/GOPR4169.JPG" alt="icland-black-sand-beach" />
            <div><NavLink to={'/details/someId'}>Details</NavLink></div>
        </div>
    );
}

export default FrontCart;