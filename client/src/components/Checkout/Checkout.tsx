import "./style.css";
import {useAppSelector } from "../../hooks";
import { selectCart } from "../../features/cartSlice";
import {axiosPrivate} from "../../utils/axios";
import { checkoutRoute } from "../../utils/apiRoutes";
import { toast } from "react-toastify";
import { toastProps } from "../../common/toasts";

const Checkout : React.FC =() =>{
    const {items} = useAppSelector(selectCart);

    async function handleClick(){
        if (items.length > 0){
            try{    
                const res = await axiosPrivate.post(checkoutRoute, items);
                window.location.replace(res.data.url);
            }catch(ex){
                toast.warn("Something went wrong trying to checkout", toastProps);
            }
            
        }else{
            toast.warn("Cannot checkout without items in cart", toastProps);
        }
    }

    return (
        <button className="checkout-btn" onClick={handleClick}>Check Out</button>
    )
}

export default Checkout;