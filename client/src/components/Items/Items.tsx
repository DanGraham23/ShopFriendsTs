import { useEffect, useState } from 'react';
import './style.css';
import { useAppSelector } from '../../hooks';
import { selectAuth } from '../../features/authSlice';
import axios from 'axios';
import { getItemsRoute } from '../../utils/APIRoutes';
import { Item } from '../../common/types';
import {AiFillPlusSquare} from 'react-icons/ai' 
import ItemNormal from '../Item-Normal/ItemNormal';

interface Props {
    curFilter: string,
}

const Items : React.FC<Props> = (props) => {
    const {id} = useAppSelector(selectAuth);
    const [items,setItems] = useState<Item[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    async function fetchItems(){
        const res = await axios.post(getItemsRoute,
            {
                user_id: id,
                tag: props.curFilter
            });
       setItems(res.data.items);
    }

    useEffect(() => {
        fetchItems();
        setCurrentPage(1);
    }, [props.curFilter]);

    function handleForwardClick() {
        setCurrentPage(currentPage => currentPage + 1);
    }

    function handleBackwardClick() {
        setCurrentPage(currentPage => currentPage - 1);
    }

    function renderCurrentPageItems(){
        const firstItemIdx = currentPage* itemsPerPage - itemsPerPage;
        const lastItemIdx = currentPage * itemsPerPage;
        const currentItems = items.slice(firstItemIdx, lastItemIdx);

        return currentItems.map((item) => {
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
        <div>
            <div className="items-display">
                {renderCurrentPageItems()}
            </div>
            <div className='pagination-btns'>
                <button onClick={handleBackwardClick} disabled={currentPage===1} className='pagination-btn'>Prev</button>
                <button onClick={handleForwardClick} disabled={currentPage===totalPages} className='pagination-btn'>Next</button>
            </div>
        </div>
        
    )
}

export default Items;