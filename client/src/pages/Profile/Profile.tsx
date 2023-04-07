import "./style.css";
import Item from '../../components/Item-Normal/ItemNormal';
import {AiFillCamera} from 'react-icons/ai';
import {ItemData} from '../../data/ItemData'
import {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { selectAuth } from "../../features/authSlice";
import {useAppSelector } from "../../hooks";

const Profile : React.FC = () => {
    const [profileImg, setProfileImg] = useState("");
    const navigate = useNavigate();
    const {isLoggedIn} = useAppSelector(selectAuth);

    useEffect(() => {
        console.log("profile ran");
        if (isLoggedIn){
            navigate('/profile');
        }else{
            navigate('/login');
        }
    }, [isLoggedIn]);

    function handleChange(e : any){
        setProfileImg(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div className="profile-main">
            <div className="profile-container">
            {
                profileImg !== "" ? 
                <img src={profileImg} alt="profile" className="profile-pic" />
                : <div className="profile-pic"></div>   
            }
            </div>
            
            <div className="profile-header">
                <h1>Danny</h1>
                <label htmlFor="profile-img-upload">
                    <AiFillCamera className="profile-picture-upload"/>
                </label>
                <input id="profile-img-upload" type="file" onChange={handleChange}/>
            </div>
            <div className="items-display">
                {
                    ItemData.map((data) => {
                        return (
                            <Item 
                        itemId={data.itemId}    
                        img={data.img}
                        name={data.name}
                        price={data.price}
                        time={data.time}
                        description={data.description}
                        tag={data.tag}
                        sellerId={data.sellerId}
                        />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Profile;