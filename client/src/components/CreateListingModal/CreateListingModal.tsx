import './style.css'
import {useState} from 'react';
import {AiOutlineClose} from 'react-icons/ai';


interface Props {
    showCreateListingModal:boolean,
    setShowCreateListingModal: React.Dispatch<React.SetStateAction<boolean>>,
}

const CreateListingModal: React.FC<Props> = (props) =>{
    const [createListingInfo, setCreateListingInfo] = useState({
        itemName: "",
        itemPrice : "",
        itemDescription : "",
        itemImg: "",
        itemTag: "",
    })
    const [imageUrl, setImageUrl] = useState("");

    function handleSubmit(e : React.FormEvent){
        e.preventDefault();
    }
    
    function handleChange(e : any){
        
        if (e.target.name === 'itemImg'){
            createListingInfo.itemImg = e.target.files[0];
            setImageUrl(URL.createObjectURL(createListingInfo.itemImg));
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
                    <img type="file" src={imageUrl} alt="item" className="item-image-upload"/> :
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
                <input type="text" 
                placeholder="Tag"
                name="itemTag"
                value={createListingInfo.itemTag}
                onChange={handleChange}
                className="item-input"/>
            </div>
            <input type="text" 
            placeholder="Item Description"
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