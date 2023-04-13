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
        if (props.isLoggedIn){
            const id = props.id;
            await axios.post(updatePfpRoute, {
                id,
                profile_picture:file.name
            },{
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