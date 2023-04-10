import "./style.css";
import logo from '../../assets/images/shop-friends-logo.jpg'
import {BsCart} from 'react-icons/bs';
import Cart from "../Cart/Cart";
import {useState} from 'react';
import CreateListingModal from '../CreateListingModal/CreateListingModal'
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/authSlice";


const Navbar:React.FC = () =>{
    const [showCart, setShowCart] = useState(false);
    const [showCreateListingModal, setShowCreateListingModal] = useState(false);
    const {isLoggedIn, username} = useSelector(selectAuth);


    return (
        <div>
        <div className="nav-container">
            <a href="/"><img src={logo} alt="shop-friends-logo" className="logo"/></a>
            <ul className="nav-items">
                {
                    isLoggedIn && <li className="nav-item" 
                    onClick={() => setShowCreateListingModal(!showCreateListingModal)}>Create Listing</li>
                }
                {
                    isLoggedIn ?
                    <a href={`profile/${username}`}><li className="nav-item">MyAccount</li></a>:
                    <a href="/login"><li className="nav-item">Login</li></a>
                    
                }
                <li className="nav-item" onClick={() => setShowCart(!showCart)} >Cart <BsCart /></li>
                {isLoggedIn && <a href="/checkout"><button className="checkout-btn">Check Out</button></a>}
                
            </ul>
        </div>
        {showCreateListingModal && <CreateListingModal showCreateListingModal={showCreateListingModal} setShowCreateListingModal={setShowCreateListingModal}/>}
        {showCart && <Cart/>}
        </div>
        
        
    )
}

export default Navbar;