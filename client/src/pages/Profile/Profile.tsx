import "./style.css";
import {AiFillCamera, AiOutlineStar, AiFillStar} from 'react-icons/ai';
import {useState,useEffect} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { selectAuth, setUserLogout } from "../../features/authSlice";
import {useAppSelector, useAppDispatch } from "../../hooks";
import axios from "axios";
import {addReviewRoute, getUserRoute, updatePfpRoute } from "../../utils/APIRoutes";
import defaultImg from '../../assets/images/default.jpg';

const Profile : React.FC = () => {
    const [profileImg, setProfileImg] = useState("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {isLoggedIn, id, username} = useAppSelector(selectAuth);
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

    const loadImage = async () => {
        try {
          const { default: image } = await import(/* @vite-ignore */ `/pfps/${usersData.profile_picture}`);
          setProfileImg(image);
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(() => {
        if (usersData){
            loadImage();
        }
    }, [usersData])


    function logout(){
        dispatch(setUserLogout({id:-1, username:""}));
        localStorage.clear();
        navigate("/login");
    }

    async function handleChange(e : any){
        const file = e.target.files[0];
        setProfileImg(URL.createObjectURL(file));
        if (isLoggedIn){
            await axios.post(updatePfpRoute, {
                id,
                profile_picture:file.name
            },{
                withCredentials:true,
            });
        }
    }

    async function handleClick(star: number){
        if (usersData){
            await axios.put(`${addReviewRoute}/${id}/${usersData.id}/${star}`).then((response:any)=> {
                console.log("review added");
            }).catch((err)=> {
                console.log(err);
            })
        }
    }

    function handleUserRatingDisplay(rating: number) {
        const stars = [1,2,3,4,5];
        return (
            stars.map((star, idx) => {
                return (
                    star <= rating ? 
                    <AiFillStar key={idx} className="rating-yellow" onClick={() => handleClick(star)}/> :
                    <AiOutlineStar key={idx} className="rating-gray" onClick={() => handleClick(star)}/>
                )
            })
        )
        
    }

    return (
        <div className="profile-main">
            <div className="profile-container">
            {
                profileImg ? 
                <img src={profileImg} alt="profile" className="profile-pic" />
                : <img src={defaultImg} alt="profile" className="profile-pic" /> 
            }
            </div>
            
            <div className="profile-header">
                <h1>{user}</h1>
                {isLoggedIn && usersData && usersData.username === username && 
                <div>
                    <label htmlFor="profile-img-upload">
                        <AiFillCamera className="profile-picture-upload"/>
                    </label>
                    <input id="profile-img-upload" type="file" onChange={handleChange} accept=".jpg"/>
                </div>
                }
            </div>
            {
                isLoggedIn && usersData && 
                <div className="profile-rating">
                    {handleUserRatingDisplay(Math.round(usersData.avg_rating))}
                </div>          
            }
            {
                isLoggedIn && usersData && usersData.username === username && 
                <div className="logout-btn-container">
                   <button onClick={logout} className="logout-btn">Logout</button>
                </div>
                
            }
        </div>
    )
}

export default Profile;