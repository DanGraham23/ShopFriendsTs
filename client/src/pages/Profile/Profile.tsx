import "./style.css";
import {AiFillCamera} from 'react-icons/ai';
import {ItemData} from '../../data/ItemData'
import {useState,useEffect} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { selectAuth } from "../../features/authSlice";
import {useAppSelector } from "../../hooks";
import { Item } from '../../common/types';
import axios from "axios";
import { getItems } from "../../utils/APIRoutes";
import ItemNormal from "../../components/Item-Normal/ItemNormal";
 
const Profile : React.FC = () => {
    const [profileImg, setProfileImg] = useState("");
    const navigate = useNavigate();
    const {isLoggedIn, username, id} = useAppSelector(selectAuth);
    const {user} = useParams();

    const [items,setItems] = useState<Item[]>([]);
    const [usersData, setUsersData] = useState({});

    // useEffect(() => {
    //     console.log("profile ran");
    //     if (isLoggedIn){
    //         navigate('/profile:username');
    //     }else{
    //         navigate('/login');
    //     }
    // }, [isLoggedIn]);

    async function fetchData(){
        const res = await axios.post(getItems,
            {
                user_id: id,
                tag: ""
            });
       setItems(res.data.items);
    }

    useEffect(() => {
        fetchData();
    }, []);

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
                <h1>{user}</h1>
                {isLoggedIn && user === username && <div>
                <label htmlFor="profile-img-upload">
                    <AiFillCamera className="profile-picture-upload"/>
                </label>
                <input id="profile-img-upload" type="file" onChange={handleChange}/>
                </div>
                }
            </div>
            <div className="items-display">
            {
                    items.map((item) => {
                        return (
                            <ItemNormal  
                            key={item.id}  
                            id={item.id}
                            item_image={item.item_image}
                            name={item.name}
                            price={item.price}
                            description={item.description}
                            tag={item.tag}
                            user_id={item.user_id}
                        />
                        )
                    })
                }        
        </div>
        </div>
    )
}

export default Profile;