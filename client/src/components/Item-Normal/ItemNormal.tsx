import "./style.css";
import {AiFillPlusSquare} from 'react-icons/ai' 
import {Item} from '../../common/types';

const ItemNormal : React.FC<Item> = (props) =>{
    return (

        <div className="item-container"> 
            <img src={props.item_image} alt="item" className="item-image"/>
            <div className="item-poster-info">
                <div className="faker-user-pfp"></div>
                <h2>TEMPUSERNAME </h2>
            </div>
            <div className="item-subheading">
                <h3>{props.name}</h3>
                <h3>${props.price}</h3>
                <h3>3.33</h3>
            </div>
            <p className="item-description">{props.description}</p>
            <AiFillPlusSquare className="add-to-cart"/>
        </div>

    )
}

export default ItemNormal;