import "./style.css";
import {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { selectAuth } from "../../features/authSlice";
import {useAppSelector } from "../../hooks";
import { selectCart } from "../../features/cartSlice";
import CheckoutItem from "../../components/CheckoutItem/CheckoutItem";
import axios from "axios";
import { checkoutRoute } from "../../utils/APIRoutes";

const Checkout : React.FC =() =>{
    const {items} = useAppSelector(selectCart);
    const navigate = useNavigate();
    const {isLoggedIn} = useAppSelector(selectAuth);

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

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        if (items.length > 0){
            const res = await axios.post(checkoutRoute, items, {
                withCredentials:true
            });
            window.location.replace(res.data.url);
        }
    }

    return (
        <div className="checkout-container">
            <form onSubmit={handleSubmit} className="checkout-form">
            <p>Our checkout is powered by Stripe</p>
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