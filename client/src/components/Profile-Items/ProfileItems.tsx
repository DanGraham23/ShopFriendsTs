import { useEffect, useState } from 'react';
import { Item } from '../../common/types';
import ItemNormal from '../Item-Normal/ItemNormal';
import './style.css';
import axios from 'axios';
import { getItemsRoute } from '../../utils/APIRoutes';

const ProfileItems:React.FC<any> = (props) => {
    const [items,setItems] = useState<Item[]>([]);
    

    async function fetchItems(){
        const res = await axios.get(`${getItemsRoute}/${props.user.id}/profile`);
        setItems(res.data.items);
    }

    useEffect(() => {
        fetchItems();
    }, []);

    function renderCurrentPageItems(){

        return items.map((item) => {
            return (
                <ItemNormal  
                key={item.id}  
                id={item.id}
                item_image={item.item_image}
                name={item.name}
                price={item.price}
                description={item.description}
                tag={item.tag}
                user_id={item.user_id}
                profile_picture={item.profile_picture}
                username={item.username}
            />
            )
        })
    }

    return (
        <div className='items-container'>
            <div className="items-display">
                {renderCurrentPageItems()}
            </div>
        </div>
    )
}

export default ProfileItems;