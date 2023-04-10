import "./style.css";
import img1 from '../../assets/images/home-img1.jpg'
import img2 from '../../assets/images/home-img2.jpg'
import img3 from '../../assets/images/home-img3.jpg'
import img4 from '../../assets/images/home-img4.jpg'
import img5 from '../../assets/images/home-img5.jpg'
import img6 from '../../assets/images/home-img6.jpg'
import img7 from '../../assets/images/home-img7.jpg'
import img8 from '../../assets/images/home-img8.jpg'
import Filters from "../../components/Filters/Filters";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { selectAuth } from "../../features/authSlice";
import {useAppSelector } from "../../hooks";
import Items from "../../components/Items/Items";


const Home : React.FC = () =>{
    const navigate = useNavigate();
    const {isLoggedIn} = useAppSelector(selectAuth);
    const [curFilter, setCurFilter] = useState("");

    useEffect(() => {
        console.log("home ran");
        if (isLoggedIn){
            navigate('/');
        }else{
            navigate('/login');
        }
    }, [isLoggedIn]);


    return (
        <div className="home-container">
            <Filters curFilter={curFilter} setCurFilter={setCurFilter}/>
            {curFilter === "" ? <div>
            <div className="home-header">
                <h2>ShopFriends</h2>
                <h2 className="reflect">PEER-TO-PEER MARKET</h2>
            </div>
            <div className="image-collage">
                <img src={img1} alt="home-img1" className="grid-item"/>
                <img src={img2} alt="home-img2" className="grid-item"/>
                <img src={img3} alt="home-img3" className="grid-item"/>
                <img src={img4} alt="home-img4" className="grid-item"/>
                <img src={img5} alt="home-img5" className="grid-item"/>
                <img src={img6} alt="home-img6" className="grid-item"/>
                <img src={img7} alt="home-img7" className="grid-item"/>
                <img src={img8} alt="home-img8" className="grid-item"/>
            </div>
        </div> : <Items curFilter={curFilter}/>}
        </div>

    )
}

export default Home;