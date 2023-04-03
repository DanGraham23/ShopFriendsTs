import "./style.css";
import img1 from '../../assets/images/home-img1.jpg'
import img2 from '../../assets/images/home-img2.jpg'
import img3 from '../../assets/images/home-img3.jpg'
import img4 from '../../assets/images/home-img4.jpg'
import img5 from '../../assets/images/home-img5.jpg'
import img6 from '../../assets/images/home-img6.jpg'
import img7 from '../../assets/images/home-img7.jpg'
import img8 from '../../assets/images/home-img8.jpg'

const Home : React.FC = () =>{
    return (
            
        <div className="home-container">
            <h1 className="text-slide-in-right">Welcome to ShopFriends</h1>
            <h2 className="text-slide-in-left">We are a Peer-to-Peer market</h2>
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
        </div>
    )
}

export default Home;