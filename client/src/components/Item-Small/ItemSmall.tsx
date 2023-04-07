import "./style.css";
import {IoIosRemoveCircle} from 'react-icons/io' 
import {Item} from '../../common/types';

const ItemSmall : React.FC<Item> = (props) =>{
    return (

        <div className="item-small-container"> 
            <img src={props.item_image} alt="item-small" className="item-small-image"/>
            <div className="item-small-poster-info">
                <div className="faker-user-pfp"></div>
                <h2>TEMPUSERNAME </h2>
            </div>
            <div className="item-small-subheading">
                <h3>{props.name}</h3>
                <h3>${props.price}</h3>
                <h3>3.33</h3>
            </div>
            <p className="item-small-description">{props.description}</p>
            <IoIosRemoveCircle className="remove-from-cart"/>
        </div>

    )
}

export default ItemSmall;