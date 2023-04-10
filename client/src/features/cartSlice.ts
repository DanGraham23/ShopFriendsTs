import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Item } from "../common/types";
import {getCartItemsRoute, removeCartItemRoute } from "../utils/APIRoutes";
import axios from 'axios';
import type { RootState } from '../store';

interface Cart {
    cart_id: number,
    user_id:number,
    items: Item[],
    isLoading: boolean,
}

const initialState : Cart = {
    cart_id: -1,
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
        setCartOwner: (state, action:PayloadAction<{user_id:number, cart_id:number}>) => {
            state.user_id = action.payload.user_id;
            state.cart_id = action.payload.cart_id;
         },
        setCartItems: (state, action:PayloadAction<Item[]>) => {
           state.items = action.payload;
        },
    },
});

export const addToCart = (item:{item_id:number}) => async (dispatch:any) => {
    dispatch(setLoading(true));

    dispatch(setLoading(false));
}

export const removeFromCart = (item:{item_id:number, cart_id:number}) => async (dispatch:any) => {
    dispatch(setLoading(true));

    dispatch(setLoading(false));
}

export const fetchCartItems = (user_id: number) => async (dispatch:any) => {
    dispatch(setLoading(true));
    // dispatch(setCartOwner(user_id));
    await axios.get(`${getCartItemsRoute}/${user_id}`).then((response:any) => {
        dispatch(setCartItems(response.data.items));
    }).catch((err) => {
        console.log(err);
    });
    
    dispatch(setLoading(false));
}


export const {setLoading, setCartItems, setCartOwner} = cartSlice.actions;
export default cartSlice.reducer;
export const selectCart = (state:RootState) => state.cart;