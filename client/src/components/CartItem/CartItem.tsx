import "./style.css";
import {IoIosRemoveCircle} from 'react-icons/io' 
import {Item} from '../../common/types';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { removeFromCart } from "../../features/cartSlice";
import { selectAuth } from "../../features/authSlice";

const CartItem : React.FC<Item> = (props) =>{
    const dispatch = useAppDispatch();
    const {id} = useAppSelector(selectAuth);

    return (
        <div className="cart-item-container"> 
            <img src={props.item_image} alt="cart-item" className="cart-item-image"/>
            <div className="cart-item-poster-info">
                <img src={props.profile_picture} alt="user" className="user-item-pfp"/>
                <h4>{props.username}</h4>
                <h4>${props.price}</h4>
            </div>
            <div className="cart-item-subheading">
                <h3>{props.name}</h3>
                <h3>{props.tag}</h3>
            </div>
            <p className="cart-item-description">{props.description}</p>
            {props.id && <IoIosRemoveCircle className="remove-from-cart" 
            onClick={() => dispatch(removeFromCart(props.id, id))}/>}
        </div>

    )
}

export default CartItem;