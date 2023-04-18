import './style.css'
import {useState} from 'react';
import {AiOutlineClose} from 'react-icons/ai';
import axios from 'axios';
import { selectAuth } from "../../features/authSlice";
import { addItemRoute } from '../../utils/APIRoutes';
import {useAppSelector} from "../../hooks";
import { Item } from '../../common/types';
import {toast} from 'react-toastify';
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
            const formData = new FormData();
            formData.append('user_id', id);
            formData.append('description', itemDescription);
            formData.append('name', itemName);
            formData.append('price', Number(Number(itemPrice).toFixed(2)));
            formData.append('item_image', itemImg);
            formData.append('tag', itemTag);
            await axios.put(addItemRoute,
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials:true,
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
            setCreateListingInfo({...createListingInfo, [e.target.name]: e.target.files[0]});
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
                    <div className="item-image-upload"></div>
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
                placeholder="Name"
                name="itemName"
                value={createListingInfo.itemName}
                onChange={handleChange}
                className="item-input"/>
                <input type="text" 
                placeholder="$ Price (USD)"
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
            <textarea 
            placeholder="Add details about condition, how the garmet fits, additional measurements, shipping policies, retail price, link to retail page, etc"
            name="itemDescription"
            value={createListingInfo.itemDescription}
            onChange={handleChange}
            className="item-input-description"/>
            <button type="submit" className="create-listing-btn">List Item</button>
            </form>
        </div>
    )
}

export default CreateListingModal;