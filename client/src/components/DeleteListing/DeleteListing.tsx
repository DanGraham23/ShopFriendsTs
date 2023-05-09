import { axiosPrivate } from '../../utils/axios';
import { removeItemRoute } from '../../utils/apiRoutes';
import './style.css';
import { toastProps } from '../../common/toasts';
import { toast } from 'react-toastify';

interface Props{
    id:number
}

const DeleteListing: React.FC<Props> = (props) => {
    
    async function handleClick(){
        await axiosPrivate.delete(`${removeItemRoute}/${props.id}`).then((res) => {
            toast.success(res.data.msg, toastProps);
        }).catch((err) => {
            toast.warn("Failed to delete the specified listing!", toastProps);
        });
    }
    
    return (
        <button onClick={handleClick} className='delete-listing-btn'>Delete Listing</button>
    )
}

export default DeleteListing;