import axios from 'axios';
import {toast } from 'react-toastify';
import { toastProps } from '../../common/toasts';
import { updatePfpRoute } from '../../utils/APIRoutes';
import './style.css';
import {AiFillCamera} from 'react-icons/ai';

interface Props {
    setProfileImg: React.Dispatch<React.SetStateAction<string>>,
    isLoggedIn: boolean,
    id: number,
}

const ImageUpload:React.FC<Props> = (props) => {
    
    async function handleChange(e : any){
        const file = e.target.files[0];
        props.setProfileImg(URL.createObjectURL(file));
        const formData = new FormData();
        formData.append('id',  props.id);
        formData.append('profile_picture', file);
        if (props.isLoggedIn){
            await axios.post(updatePfpRoute, formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
                },
                withCredentials:true,
            }).then((res:any)=> {
                toast.success(res.data.msg, toastProps);
            }).catch((err) => {
                if (err.response.status){
                    toast.warn(err.response.data.msg, toastProps);
                }
            });
        }
    }
    
    return (
        <div>
            <label htmlFor="profile-img-upload">
                <AiFillCamera className="profile-picture-upload"/>
            </label>
            <input id="profile-img-upload" type="file" onChange={handleChange} accept=".jpg"/>
        </div>
    )
}

export default ImageUpload;