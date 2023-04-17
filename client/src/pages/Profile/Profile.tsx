import "./style.css";
import {useState,useEffect} from 'react';
import {useParams } from "react-router-dom";
import { selectAuth} from "../../features/authSlice";
import {useAppSelector} from "../../hooks";
import axios from "axios";
import {getUserRoute} from "../../utils/APIRoutes";
import 'react-toastify/dist/ReactToastify.css';
import CreateListingModal from "../../components/CreateListingModal/CreateListingModal";
import Items from "../../components/Items/Items";
import Rating from "../../components/Rating/Rating";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import Logout from "../../components/Logout/Logout";

const Profile : React.FC = () => {
    const [profileImg, setProfileImg] = useState("");
    const {isLoggedIn, id, username} = useAppSelector(selectAuth);
    const {user} = useParams();
    const [usersData, setUsersData] = useState<any>(null);
    const [showCreateListingModal, setShowCreateListingModal] = useState(false);
    
    async function fetchUser(){
        if (user){
            const res = await axios.get(`${getUserRoute}/${user}`);
            setUsersData(res.data.user);
        }
    }

      useEffect(() => {
        if (usersData){
            setProfileImg(usersData.profile_picture);
        }
    }, [usersData])

    useEffect(() => {
        fetchUser();
    }, [isLoggedIn]);

    return (
        <div className="profile-main">
            <div className="profile-container">
            {
                profileImg ? 
                <img src={profileImg} alt="profile" className="profile-pic" />
                : <img src='/pfps/default.jpg' alt="profile" className="profile-pic" /> 
            }
            </div>
            
            <div className="profile-header">
                <h1>{user}</h1>
                {   isLoggedIn && usersData && usersData.username === username && 
                    <ImageUpload 
                    setProfileImg={setProfileImg}
                    isLoggedIn={isLoggedIn}
                    id={id}
                    />
                }
            </div>
            {
                usersData && 
                <Rating 
                avgRating={usersData.avg_rating}
                receiverUserId={usersData.id}
                senderUserId={id} />       
            }
            {
                isLoggedIn && usersData && usersData.username === username && 
                <div className="btn-container">
                   <Logout />
                   <button 
                   onClick={() => setShowCreateListingModal(!showCreateListingModal)} 
                   className="create-listing-modal-btn">Create Listing</button>
                </div>
                
            }
            {
                showCreateListingModal && 
                <CreateListingModal 
                showCreateListingModal={showCreateListingModal} 
                setShowCreateListingModal={setShowCreateListingModal}/>
            }
            <hr className="profile-page-divider"></hr>
            {
                usersData && 
                <Items 
                curFilter={"profile"} 
                curId={usersData.id}/>
            }
        </div>
    )
}

export default Profile;