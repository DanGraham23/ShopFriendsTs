import "./style.css";
import {Item} from '../../common/types';
import {useAppSelector } from "../../hooks";
import { selectAuth } from "../../features/authSlice";
import DeleteListing from "../DeleteListing/DeleteListing";
import AddCartItem from "../AddCartItem/AddCartItem";

const NormalItem : React.FC<Item> = (props) =>{
    const {isLoggedIn, id} = useAppSelector(selectAuth);

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
                <AddCartItem 
                item={props}
                user_id={id}/>
            }
            {
                isLoggedIn && id === props.user_id && props.id &&
                <DeleteListing 
                id={props.id}/>
            }
        </div>

    )
}

export default NormalItem;