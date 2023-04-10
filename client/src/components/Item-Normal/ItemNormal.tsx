import "./style.css";
import {AiFillPlusSquare} from 'react-icons/ai' 
import {Item} from '../../common/types';
import tempItemImg from '../../assets/images/shoe3.jpg';
import tempUserPfp from '../../assets/images/default.jpg';

const ItemNormal : React.FC<Item> = (props) =>{
    return (

        <div className="item-container"> 
            {/* <img src={props.item_image} alt="item" className="item-image"/> */}
            <img src={tempItemImg} alt="item" className="item-image"/>
            <div className="item-poster-info">
                <img src={tempUserPfp} alt="user" className="user-item-pfp"/>
                <h4>{props.username}</h4>
                <h4>${props.price}</h4>
            </div>
            <div className="item-subheading">
                <h4>{props.name}</h4>
                <h4>{props.tag}</h4>
            </div>
            <p className="item-description">{props.description}</p>
            <AiFillPlusSquare className="add-to-cart"/>
        </div>

    )
}

export default ItemNormal;