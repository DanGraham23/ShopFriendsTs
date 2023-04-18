import {AiFillPlusSquare} from 'react-icons/ai' 
import { toastProps } from "../../common/toasts";
import {toast } from "react-toastify";
import { addToCart, selectCart } from '../../features/cartSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Item } from '../../common/types';
import './style.css';

interface Props{
    item:Item,
    user_id:number,
}

const AddCartItem:React.FC<Props> = (props) => {
    const dispatch = useAppDispatch();
    const {items} = useAppSelector(selectCart);
    
    function handleClick(){
        dispatch(addToCart(props.item, props.user_id));
        if (items.length > 0){
            var i = items.length;
            while (i--){
                if (items[i].id === props.item.id){
                    toast.warn("Item arleady in cart!", toastProps);
                    return;
                }
            }
        }
        toast.success("Item added successfully!", toastProps);
    }
    
    return (
        <AiFillPlusSquare 
        className="add-to-cart"
        onClick={handleClick}/>
    )
}

export default AddCartItem;