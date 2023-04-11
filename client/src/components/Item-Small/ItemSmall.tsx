import "./style.css";
import {IoIosRemoveCircle} from 'react-icons/io' 
import {Item} from '../../common/types';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { removeFromCart } from "../../features/cartSlice";
import { selectAuth } from "../../features/authSlice";

const ItemSmall : React.FC<Item> = (props) =>{
    const dispatch = useAppDispatch();
    const {id} = useAppSelector(selectAuth);

    return (
        <div className="item-small-container"> 
            <img src={`/items-images/${props.item_image}`} alt="item-small" className="item-small-image"/>
            <div className="item-small-poster-info">
                <img src={`/pfps/${props.profile_picture}`} alt="user" className="user-item-pfp"/>
                <h4>{props.username}</h4>
                <h4>${props.price}</h4>
            </div>
            <div className="item-small-subheading">
                <h3>{props.name}</h3>
                <h3>{props.tag}</h3>
            </div>
            <p className="item-small-description">{props.description}</p>
            <IoIosRemoveCircle className="remove-from-cart" 
            onClick={() => dispatch(removeFromCart({item_id:props.id, user_id: id}))}/>
        </div>

    )
}

export default ItemSmall;