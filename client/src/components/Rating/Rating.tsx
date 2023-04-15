import axios from 'axios';
import {BsStar, BsStarHalf,BsStarFill} from 'react-icons/bs';
import {toast } from 'react-toastify';
import { toastProps } from '../../common/toasts';
import { addReviewRoute } from '../../utils/APIRoutes';
import './style.css';

interface Props {
    avgRating: number,
    receiverUserId: number,
    senderUserId: number,
}

const Rating: React.FC<Props> = (props) => {
    async function handleClick(star: number){
        if (props){
            await axios.put(`${addReviewRoute}/${props.senderUserId}/${props.receiverUserId}/${star}`,
            {
                withCredentials:true
            }).then((res:any)=> {
                toast.success(res.data.msg, toastProps);
            }).catch((err)=> {
                if (err.response.status){
                    toast.warn(err.response.data.msg, toastProps);
                }else{
                    toast.warn("Something went wrong, try again later!", toastProps);
                }
            })
        }
    }

    function handleUserRatingDisplay(rating: number) {
        const stars = [1,2,3,4,5];
        return (
            stars.map((star, idx) => {
                return (
                    star <= Math.ceil(rating) ? 
                    (star <= rating ? <BsStarFill key={idx} className="rating-yellow" onClick={() => handleClick(star)}/> 
                    : <BsStarHalf key={idx} className="rating-yellow" onClick={() => handleClick(star)}/>)
                    : <BsStar key={idx} className="rating-gray" onClick={() => handleClick(star)}/>
                )
            })
        )
        
    }

    return (
        <div className="profile-rating">
            {handleUserRatingDisplay(props.avgRating)}
        </div>   
    )
}

export default Rating;