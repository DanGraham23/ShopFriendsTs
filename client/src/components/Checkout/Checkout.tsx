import "./style.css";
import {useAppSelector } from "../../hooks";
import { selectCart } from "../../features/cartSlice";
import {axiosPrivate} from "../../utils/axios";
import { checkoutRoute } from "../../utils/APIRoutes";

const Checkout : React.FC =() =>{
    const {items} = useAppSelector(selectCart);

    async function handleClick(){
        if (items.length > 0){
            const res = await axiosPrivate.post(checkoutRoute, items);
            window.location.replace(res.data.url);
        }
    }

    return (
        <button className="checkout-btn" onClick={handleClick}>Check Out</button>
    )
}

export default Checkout;