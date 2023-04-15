import "./style.css";
import {BsCart} from 'react-icons/bs';
import Cart from "../Cart/Cart";
import {useState} from 'react';
import { selectAuth } from "../../features/authSlice";
import {AiOutlineClose} from 'react-icons/ai';
import { useAppSelector } from "../../hooks";

const Navbar:React.FC = () =>{
    const [showCart, setShowCart] = useState(false);
    const {isLoggedIn, username} = useAppSelector(selectAuth);


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
                    {!showCart ? <BsCart />
                    : <AiOutlineClose />}
                    </li>
                
                {isLoggedIn && <a href="/checkout"><button className="checkout-btn">Check Out</button></a>}
                
            </ul>
        </div>
        
        {showCart && <Cart/>}
        </nav>
        
        
    )
}

export default Navbar;