import "./style.css";
import ItemSmall from "../Item-Small/ItemSmall"
import {ItemData} from '../../data/ItemData';


const Cart: React.FC = () =>{
    
    return (
        <div className="cart-container scroll-style">
            {
                ItemData.map((data) => {
                    return (
                        <ItemSmall 
                    img={data.img}
                    name={data.name}
                    price={data.price}
                    time={data.time}
                    description={data.description}
                    />
                    )
                })
            }
        </div>
    )
}

export default Cart;