import "./style.css";
import {BsCart} from 'react-icons/bs';
import Cart from "../Cart/Cart";
import {useState} from 'react';
import { selectAuth } from "../../features/authSlice";
import {AiOutlineClose} from 'react-icons/ai';
import { useAppSelector } from "../../hooks";
import Checkout from "../Checkout/Checkout";
import { selectCart } from "../../features/cartSlice";

const Navbar:React.FC = () =>{
    const [showCart, setShowCart] = useState(false);
    const {isLoggedIn, username} = useAppSelector(selectAuth);
    const {items} = useAppSelector(selectCart);

    return (
        <nav>
        <div className="nav-container">
            <a href="/" className="logo">ShopFriends</a>
            <ul className="nav-items">
                
                {
                    isLoggedIn ?
                    <a href={`profile/${username}`}><li className="nav-item">MyAccount</li></a>:
                    <a href="/login"><li className="nav-item">Login</li></a>
                    
                }
                <li className="nav-item" onClick={() => setShowCart(!showCart)} >
                    {!showCart && isLoggedIn ? 
                    <div>
                        {items.length < 10 ? 
                        <div className="item-cart-count">{items.length}</div> : 
                        <div className="item-cart-count">9+</div>}
                        <BsCart />
                    </div>
                    : <AiOutlineClose />}
                    </li>
                
                {isLoggedIn &&<Checkout />}
                
            </ul>
        </div>
        
        {showCart && <Cart/>}
        </nav>
        
        
    )
}

export default Navbar;