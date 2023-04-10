import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Item } from "../common/types";
import {addCartItemRoute, getCartItemsRoute, removeCartItemRoute } from "../utils/APIRoutes";
import axios from 'axios';
import type { RootState } from '../store';

interface Cart {
    user_id:number,
    items: Item[],
    isLoading: boolean,
}

const initialState : Cart = {
    user_id: -1,
    items: [],
    isLoading: false,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setCartOwner: (state, action:PayloadAction<{user_id:number}>) => {
            state.user_id = action.payload.user_id;
         },
        setCartItems: (state, action:PayloadAction<Item[]>) => {
           state.items = action.payload;
        },
        setRemoveCartItem: (state, action:PayloadAction<{item_id:number}>) => {
            state.items = state.items.filter((item) => item.id !== action.payload.item_id);
        },
        setAddCartItem: (state, action:PayloadAction<Item>) => {
            state.items = [...state.items, action.payload]
        },
    },
});

export const addToCart = (item:Item, user_id:number) => async (dispatch:any) => {
    dispatch(setLoading(true));
    await axios.put(`${addCartItemRoute}/${user_id}/${item.id}`).then((response:any)=> {
        dispatch(setAddCartItem(item));
    }).catch((err)=> {
        console.log(err);
    })
    
    dispatch(setLoading(false));
}

export const removeFromCart = (item:{item_id:number, user_id:number}) => async (dispatch:any) => {
    dispatch(setLoading(true));
    await axios.delete(`${removeCartItemRoute}/${item.user_id}/${item.item_id}`).catch((err)=> {
        console.log(err);
    })
    dispatch(setRemoveCartItem({item_id:item.item_id}));
    dispatch(setLoading(false));
}

export const fetchCartItems = (user_id: number) => async (dispatch:any) => {
    dispatch(setLoading(true));
    dispatch(setCartOwner({user_id}));
    await axios.get(`${getCartItemsRoute}/${user_id}`).then((response:any) => {
        dispatch(setCartItems(response.data.items));
    }).catch((err) => {
        console.log(err);
    });
    
    dispatch(setLoading(false));
}


export const {setLoading, setCartItems, setCartOwner, setRemoveCartItem, setAddCartItem} = cartSlice.actions;
export default cartSlice.reducer;
export const selectCart = (state:RootState) => state.cart;