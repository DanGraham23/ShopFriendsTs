import axios from 'axios';
import { removeItemRoute } from '../../utils/APIRoutes';
import './style.css';
import { toastProps } from '../../common/toasts';
import { toast } from 'react-toastify';

interface Props{
    id:number
}

const DeleteListing: React.FC<Props> = (props) => {
    
    async function handleClick(){
        await axios.delete(`${removeItemRoute}/${props.id}`, {
            withCredentials:true,
        }).then((res) => {
            toast.success("The listing has been deleted!", toastProps);
        }).catch((err) => {
            toast.warn("Failed to delete the specified listing!", toastProps);
        });
    }
    
    return (
        <button onClick={handleClick} className='delete-listing-btn'>Delete Listing</button>
    )
}

export default DeleteListing;