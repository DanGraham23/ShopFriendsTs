import { axiosPrivate } from '../../utils/axios';
import {toast } from 'react-toastify';
import { toastProps } from '../../common/toasts';
import { updatePfpRoute } from '../../utils/apiRoutes';
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
        formData.append('id',  String(props.id));
        formData.append('profile_picture', file);
        if (props.isLoggedIn){
            await axiosPrivate.put(updatePfpRoute, formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
                }
            }).then((res:any)=> {
                toast.success(res.data.msg, toastProps);
            }).catch((err) => {
                if (err?.response?.data?.msg){
                    toast.warn(err.response.data.msg, toastProps);
                }else{
                    toast.warn("Something went wrong when trying to upload image", toastProps);
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