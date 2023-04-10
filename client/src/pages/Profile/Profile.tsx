import "./style.css";
import {AiFillCamera, AiOutlineStar, AiFillStar} from 'react-icons/ai';
import {useState,useEffect} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { selectAuth } from "../../features/authSlice";
import {useAppSelector } from "../../hooks";
import axios from "axios";
import {getUserRoute } from "../../utils/APIRoutes";
 
const Profile : React.FC = () => {
    const [profileImg, setProfileImg] = useState("");
    const navigate = useNavigate();
    const {isLoggedIn, username} = useAppSelector(selectAuth);
    const {user} = useParams();

    const [usersData, setUsersData] = useState(null);

    async function fetchUser(){
        if (user){
            const res = await axios.get(`${getUserRoute}/${user}`);
            setUsersData(res.data.user);
        }
        
    }

    useEffect(() => {
        if (isLoggedIn){
            fetchUser();
        }
        
    }, [isLoggedIn]);


    function handleChange(e : any){
        setProfileImg(URL.createObjectURL(e.target.files[0]));
    }

    function handleUserRatingDisplay(rating: number) {
        const stars = [1,2,3,4,5];
        return (
            stars.map((star, idx) => {
                return (
                    star <= rating ? 
                    <AiFillStar className="rating-yellow"/> :
                    <AiOutlineStar className="rating-gray"/>
                )
            })
        )
        
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
                <h1>{user}</h1>
                {isLoggedIn && usersData && usersData.username === username && 
                <div>
                    <label htmlFor="profile-img-upload">
                        <AiFillCamera className="profile-picture-upload"/>
                    </label>
                    <input id="profile-img-upload" type="file" onChange={handleChange}/>
                </div>
                }
            </div>
            <div>
            {
                isLoggedIn && usersData && 
                <div className="profile-rating">
                    {handleUserRatingDisplay(Math.round(usersData.avg_rating))}
                </div>          
                }
            </div>
        </div>
    )
}

export default Profile;