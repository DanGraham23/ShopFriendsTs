import "./style.css";
import {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { selectAuth } from "../../features/authSlice";
import {useAppSelector } from "../../hooks";
import { selectCart } from "../../features/cartSlice";
import CheckoutItem from "../../components/Checkout-Item/CheckoutItem";

const Checkout : React.FC =() =>{
    const {items} = useAppSelector(selectCart);
    const navigate = useNavigate();
    const {isLoggedIn} = useAppSelector(selectAuth);
    
    const [checkoutFormInfo, setCheckoutFormInfo] = useState({
        fName : "",
        lName : "",
        email: "",
        address: "",
        phone: "",
    })

    

    useEffect(() => {
        if (isLoggedIn){
            navigate('/checkout');
        }else{
            navigate('/login');
        }
    }, [isLoggedIn]);


    function calculateTotalPrice(): number{
        let total = 0;
        if (items.length > 0){
            items.map((item, idx) => total += item.price);
        }
        return Math.round( total * 1e2 ) / 1e2;
    }

    function handleSubmit(e: React.FormEvent){
        e.preventDefault();
    }

    function handleChange(e : React.ChangeEvent<HTMLInputElement>){
        setCheckoutFormInfo({...checkoutFormInfo, [e.target.name]:e.target.value});
    }

    return (
        <div className="checkout-container">
            <form onSubmit={handleSubmit} className="checkout-form">
            <label className="checkout-label">First Name</label>
            <input type="text" 
            placeholder="First name"
            name="fName"
            value={checkoutFormInfo.fName}
            onChange={handleChange}
            className="checkout-input"/>
            <label className="checkout-label">Last Name</label>
            <input type="text" 
            placeholder="Last name"
            name="lName"
            value={checkoutFormInfo.lName}
            onChange={handleChange}
            className="checkout-input"/>
            <label className="checkout-label">Email</label>
            <input type="text" 
            placeholder="Email"
            name="email"
            value={checkoutFormInfo.email}
            onChange={handleChange}
            className="checkout-input"/>
            <label className="checkout-label">Address</label>
            <input type="text" 
            placeholder="Address"
            name="address"
            value={checkoutFormInfo.address}
            onChange={handleChange}
            className="checkout-input"/>
            <label className="checkout-label">Phone Number</label>
            <input type="text" 
            placeholder="Phone Number"
            name="phone"
            value={checkoutFormInfo.phone}
            onChange={handleChange}
            className="checkout-input"/>
            <p>Total: ${calculateTotalPrice()}</p>
            <button type="submit" className="checkout-form-btn">Purchase Items</button>
        </form>
        <div className="checkout-items-container scroll-style">
        {
            items && 
            items.map((item) => <CheckoutItem 
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
            />)
        }
        </div>
        </div>
    )
}

export default Checkout;