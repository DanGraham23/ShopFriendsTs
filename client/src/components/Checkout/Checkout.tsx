import "./style.css";
import {useAppSelector } from "../../hooks";
import { selectCart } from "../../features/cartSlice";
import axios from "axios";
import { checkoutRoute } from "../../utils/APIRoutes";

const Checkout : React.FC =() =>{
    const {items} = useAppSelector(selectCart);


    async function handleClick(){
        if (items.length > 0){
            const res = await axios.post(checkoutRoute, items, {
                withCredentials:true
            });
            window.location.replace(res.data.url);
        }
    }

    return (
        <button className="checkout-btn" onClick={handleClick}>Check Out</button>
    )
}

export default Checkout;