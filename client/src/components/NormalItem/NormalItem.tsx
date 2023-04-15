import "./style.css";
import {AiFillPlusSquare} from 'react-icons/ai' 
import {Item} from '../../common/types';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectAuth } from "../../features/authSlice";
import { addToCart, selectCart } from "../../features/cartSlice";
import { toastProps } from "../../common/toasts";
import {toast } from "react-toastify";

const NormalItem : React.FC<Item> = (props) =>{
    const dispatch = useAppDispatch();
    const {isLoggedIn, id} = useAppSelector(selectAuth);
    const {items} = useAppSelector(selectCart);

    function handleClick(){
        dispatch(addToCart(props, id));
        if (items.length > 0){
            var i = items.length;
            while (i--){
                if (items[i].id === props.id){
                    toast.warn("Item arleady in cart!", toastProps);
                    return;
                }
            }
        }
    }

    return (

        <div className="normal-item-container"> 
            <img src={props.item_image} alt="normal-item" className="normal-item-image"/>
            <div className="normal-item-poster-info">
                <a href={`/profile/${props.username}`} className="user-link">
                <img src={props.profile_picture} alt="user" className="user-item-pfp"/>
                <h4>{props.username}</h4>
                </a>
                <h4>${props.price}</h4>
            </div>
            <div className="normal-item-subheading">
                <h4>{props.name}</h4>
                <h4>{props.tag}</h4>
            </div>
            <p className="normal-item-description">{props.description}</p>
            {  isLoggedIn && id !== props.user_id &&
                <AiFillPlusSquare className="add-to-cart"
                onClick={handleClick}/>
            }
        </div>

    )
}

export default NormalItem;