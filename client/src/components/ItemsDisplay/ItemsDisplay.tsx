import { useEffect, useState } from 'react';
import './style.css';
import axios from '../../utils/axios';
import { getItemsRoute } from '../../utils/apiRoutes';
import { Item } from '../../common/types';
import NormalItem from '../NormalItem/NormalItem';
import { toastProps } from '../../common/toasts';
import { toast } from 'react-toastify';

interface Props {
    curFilter: string,
    curId: number,
}

const ItemsDisplay : React.FC<Props> = (props) => {
    const [items,setItems] = useState<Item[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    async function fetchItems(){
        await axios.get(`${getItemsRoute}/${props.curId}/${props.curFilter}`).then((res) => {
            setItems(res.data.items);
        }).catch((err) =>{
            toast.warn("Something went wrong trying to fetch items", toastProps);
        });
        
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
                <NormalItem  
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
            {props.curFilter !== ""  && totalPages > 1&&<div className='pagination-btns'>
                <button onClick={handleBackwardClick} disabled={currentPage===1} className='pagination-btn'>Prev</button>
                <button onClick={handleForwardClick} disabled={currentPage===totalPages} className='pagination-btn'>Next</button>
            </div>}
        </div>
        
    )
}

export default ItemsDisplay;