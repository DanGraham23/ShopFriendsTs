import "./style.css";
import {Item} from '../../common/types';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { removeFromCart } from "../../features/cartSlice";
import { selectAuth } from "../../features/authSlice";

const CheckoutItem : React.FC<Item> = (props) =>{
    const dispatch = useAppDispatch();
    const {id} = useAppSelector(selectAuth);

    return (
        <div className="checkout-item-container"> 
            <img src={props.item_image} alt="item-checkout" className="checkout-item-image"/>
            <div className="checkout-item-poster-info">
                <img src={props.profile_picture} alt="user" className="user-item-pfp"/>
                <h4>{props.username}</h4>
                <h4>${props.price}</h4>
            </div>
            <div className="checkout-item-subheading">
                <h3>{props.name}</h3>
            </div>
            <p className="checkout-item-description">{props.description}</p>
            {props.id && <button
            className="remove-from-cart-checkout" 
            onClick={() => dispatch(removeFromCart(props.id, id))}>Remove</button>}
        </div>

    )
}

export default CheckoutItem;