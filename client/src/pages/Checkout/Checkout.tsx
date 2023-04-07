import "./style.css";
import {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { selectAuth } from "../../features/authSlice";
import {useAppSelector } from "../../hooks";

const Checkout : React.FC =() =>{

    const [checkoutFormInfo, setCheckoutFormInfo] = useState({
        fName : "",
        lName : "",
        email: "",
        address: "",
        phone: "",
    })

    const navigate = useNavigate();
    const {isLoggedIn} = useAppSelector(selectAuth);

    useEffect(() => {
        console.log("checkout ran");
        if (isLoggedIn){
            navigate('/checkout');
        }else{
            navigate('/login');
        }
    }, [isLoggedIn]);

    function handleSubmit(e: React.FormEvent){
        e.preventDefault();
    }

    function handleChange(e : React.ChangeEvent<HTMLInputElement>){
        setCheckoutFormInfo({...checkoutFormInfo, [e.target.name]:e.target.value});
    }

    return (
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
            <p>Total: $XX.XX</p>
            <button type="submit" className="checkout-form-btn">Purchase Items</button>
        </form>
    )
}

export default Checkout;