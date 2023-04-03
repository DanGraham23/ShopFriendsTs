import "./style.css";
import logo from '../../assets/images/shop-friends-logo.jpg'
import {BsCart} from 'react-icons/bs'
import Filters from "../Filters/Filters";
import Cart from "../Cart/Cart";
import {useState} from 'react';
import CreateListingModal from '../CreateListingModal/CreateListingModal'

const Navbar:React.FC = () =>{
    const loggedInTest = true;    
    const [showCart, setShowCart] = useState(false);
    const [showCreateListingModal, setShowCreateListingModal] = useState(false);

    return (
        <div>
        <div className="nav-container">
            <a href="/"><img src={logo} alt="shop-friends-logo" className="logo"/></a>
            <ul className="nav-items">
                {
                    loggedInTest && <li className="nav-item" 
                    onClick={() => setShowCreateListingModal(!showCreateListingModal)}>Create Listing</li>
                }
                {
                    loggedInTest ?
                    <a href="/profile"><li className="nav-item">MyAccount</li></a>:
                    <a href="/login"><li className="nav-item">Login</li></a>
                    
                }
                <li className="nav-item" onClick={() => setShowCart(!showCart)} >Cart <BsCart /></li>
                {loggedInTest && <a href="/checkout"><button className="checkout-btn">Check Out</button></a>}
                
            </ul>
        </div>
        {showCreateListingModal && <CreateListingModal showCreateListingModal={showCreateListingModal} setShowCreateListingModal={setShowCreateListingModal}/>}
        {showCart && <Cart/>}
        <Filters />
        </div>
        
        
    )
}

export default Navbar;