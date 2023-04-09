import { useEffect, useState } from 'react';
import './style.css';
import { useAppSelector } from '../../hooks';
import { selectAuth } from '../../features/authSlice';
import axios from 'axios';
import { getItems } from '../../utils/APIRoutes';
import { Item } from '../../common/types';
import {AiFillPlusSquare} from 'react-icons/ai' 
import ItemNormal from '../Item-Normal/ItemNormal';

interface Props {
    curFilter: string,
}

const Items : React.FC<Props> = (props) => {
    const {id} = useAppSelector(selectAuth);
    const [items,setItems] = useState<Item[]>([]);

    async function fetchItems(){
        const res = await axios.post(getItems,
            {
                user_id: id,
                tag: props.curFilter
            });
       setItems(res.data.items);
    }

    useEffect(() => {
        fetchItems();
    }, [props.curFilter]);

    return (
        <div className="items-display">
            {
                    items.map((item) => {
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
                        />
                        )
                    })
                }        
        </div>
    )
}

export default Items;