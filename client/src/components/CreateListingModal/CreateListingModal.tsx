import './style.css'
import {useState} from 'react';
import {AiOutlineClose} from 'react-icons/ai';
import axios from 'axios';
import { selectAuth } from "../../features/authSlice";
import { addItemRoute } from '../../utils/APIRoutes';
import {useAppSelector} from "../../hooks";
import { Item } from '../../common/types';
import {ToastContainer, toast} from 'react-toastify';
import { toastProps } from "../../common/toasts";

interface Props {
    showCreateListingModal:boolean,
    setShowCreateListingModal: React.Dispatch<React.SetStateAction<boolean>>,
}

const CreateListingModal: React.FC<Props> = (props) =>{
    const {isLoggedIn, id} = useAppSelector(selectAuth);
    const tags = ['other', 'shirt', 'pants', 'shoes', 'hat'];
    const [imageUrl, setImageUrl] = useState("");

    const [createListingInfo, setCreateListingInfo] = useState({
        itemName: "",
        itemPrice : "",
        itemDescription : "",
        itemImg: "",
        itemTag: "other",
    })
    

    async function handleSubmit(e : React.FormEvent){
        e.preventDefault();

        //Validate the form input, check if anything is null or invalid price
        const {itemName, itemPrice, itemDescription, itemImg, itemTag} = createListingInfo;
        if (itemName !== "" && itemPrice !== "" && Number(itemPrice) !== 0 && 
        !isNaN(Number(itemPrice)) && itemDescription !== "" && 
        itemImg !== "" && itemTag !== "" && isLoggedIn){
            const item : Item = {
                user_id: id,
                description: itemDescription,
                name : itemName,
                price: Number(Number(itemPrice).toFixed(2)),
                item_image: itemImg,
                tag: itemTag
            }
            await axios.put(addItemRoute,
                item,
            {
                withCredentials:true
            }).then((res:any) => {
                toast.success("Item Created!", toastProps);
            }).catch((err) => {
                toast.warn("Failed to create item, please enter form carefully!", toastProps);
            });
        }else{
            toast.warn("Failed to create item, please enter form carefully!", toastProps);
        }
    }
    
    function handleChange(e : any){

        //Check for image upload in form
        if (e.target.name === 'itemImg'){
            setImageUrl(URL.createObjectURL(e.target.files[0]));
            setCreateListingInfo({...createListingInfo, [e.target.name]: e.target.files[0].name});
        }else{
            setCreateListingInfo({...createListingInfo, [e.target.name]: e.target.value});
        }
        
        
    }

    function closeModal(){
        props.setShowCreateListingModal(!props.showCreateListingModal);
    }

    return (
        <div>
            <div className="modal-backdrop" onClick={closeModal}></div>
            <form onSubmit={handleSubmit} className="create-listing-container">
            <AiOutlineClose className="modal-close" onClick={closeModal}/>
            <label htmlFor="item-img-upload" className="item-image-upload-container">
                {
                    imageUrl !== "" ? 
                    <img src={imageUrl} alt="item" className="item-image-upload"/> :
                    <div className="item-image-upload"> Upload Image Here</div>
                }
            </label>
            <input type="file"  
            id="item-img-upload" 
            onChange={handleChange}
            accept="image/png, image/jpeg"
            placeholder="itemImg"
            name="itemImg"/>
            <div className="create-listing-subheading">
                <input type="text" 
                placeholder="Item Name"
                name="itemName"
                value={createListingInfo.itemName}
                onChange={handleChange}
                className="item-input"/>
                <input type="text" 
                placeholder="Price"
                name="itemPrice"
                value={createListingInfo.itemPrice}
                onChange={handleChange}
                className="item-input"/>
                <select 
                onChange={handleChange} 
                name="itemTag"
                className="item-tag-selector"
                value={createListingInfo.itemTag}>
                    {tags.map((tag, index) => {
                        return (
                            <option key={index} value={tag}>
                            {tag}
                            </option>
                        )
                    })}
                </select>
            </div>
            <input type="text" 
            placeholder="Item Description"
            name="itemDescription"
            value={createListingInfo.itemDescription}
            onChange={handleChange}
            className="item-input-description"/>
            <button type="submit" className="create-listing-btn">List Item</button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default CreateListingModal;