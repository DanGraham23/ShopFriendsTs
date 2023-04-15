import "./style.css";
import CartItem from "../CartItem/CartItem"
import { useAppSelector } from "../../hooks";
import { selectCart } from "../../features/cartSlice";


const Cart: React.FC = () =>{
    const {items} = useAppSelector(selectCart);

    return (
        <div className="cart-container scroll-style">
            {
                items.map((item) => {
                    return (
                        <CartItem 
                        key={item.id}
                        id={item.id}    
                        item_image={item.item_image}
                        name={item.name}
                        price={item.price}
                        description={item.description}
                        tag={item.tag}
                        user_id={item.user_id}
                        profile_picture={item.profile_picture}
                        username={item.username}
                    />
                    )
                })
            }
        </div>
    )
}

export default Cart;