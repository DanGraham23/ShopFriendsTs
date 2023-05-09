import { axiosPrivate } from '../../utils/axios';
import {BsStar, BsStarHalf,BsStarFill} from 'react-icons/bs';
import {toast } from 'react-toastify';
import { toastProps } from '../../common/toasts';
import { addReviewRoute } from '../../utils/apiRoutes';
import './style.css';

interface Props {
    avgRating: number,
    receiverUserId: number,
    senderUserId: number,
}

const Rating: React.FC<Props> = (props) => {
    async function handleClick(star: number){
        if (props){
            await axiosPrivate.put(`${addReviewRoute}/${props.senderUserId}/${props.receiverUserId}/${star}`).then((res:any)=> {
                toast.success(res.data.msg, toastProps);
                
            }).catch((err)=> {
                if (err?.response?.data?.msg){
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
            <p className='rating-avg'>({Number(props.avgRating).toFixed(2)})</p>
        </div>   
    )
}

export default Rating;