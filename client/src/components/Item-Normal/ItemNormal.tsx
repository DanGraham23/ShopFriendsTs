import "./style.css";
import {AiFillPlusSquare} from 'react-icons/ai' 
import {Item} from '../../common/types';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectAuth } from "../../features/authSlice";
import { addToCart, selectCart } from "../../features/cartSlice";
import { toastProps } from "../../common/toasts";
import { ToastContainer, toast } from "react-toastify";

const ItemNormal : React.FC<Item> = (props) =>{
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

        <div className="item-container"> 
            <img src={`/items-images/${props.item_image}`} alt="item" className="item-image"/>
            <div className="item-poster-info">
                <a href={`/profile/${props.username}`} className="user-link">
                <img src={`/pfps/${props.profile_picture}`} alt="user" className="user-item-pfp"/>
                <h4>{props.username}</h4>
                </a>
                <h4>${props.price}</h4>
            </div>
            <div className="item-subheading">
                <h4>{props.name}</h4>
                <h4>{props.tag}</h4>
            </div>
            <p className="item-description">{props.description}</p>
            {  isLoggedIn && id !== props.user_id &&
                <AiFillPlusSquare className="add-to-cart"
                onClick={handleClick}/>
            }
            <ToastContainer />
        </div>

    )
}

export default ItemNormal;