import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { setError, clearError } from "./errorSlice";
import { registerRoute,loginRoute } from "../utils/APIRoutes";
import axios from 'axios';
import type { RootState } from '../store';

interface Auth {
    id: number,
    username: string,
    isLoggedIn: boolean,
    isLoading: boolean,
}

const initialState: Auth = {
    id: -1,
    username: "",
    isLoggedIn: false,
    isLoading: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setUser: (state,action: PayloadAction<{id:number, username:string}>) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.isLoggedIn = true;
        },
        setUserLogout: (state,action: PayloadAction<{id:number, username:string}>) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.isLoggedIn = false;
        },
        
    }
})

export const register = (user:{username:string, password:string, email:string}) => async (dispatch:any) => {
    dispatch(setLoading(true));
    await axios.post(registerRoute,
        user,
    {
        withCredentials:true
    }).then((response:any) => {
        if (response.error){
            dispatch(setError(response.error));
        }else{
            if (typeof window !== "undefined") {
                localStorage.setItem("shopfriend-user", JSON.stringify(response.data.returnedUser));
                dispatch(setUser(response.data.returnedUser));
                dispatch(clearError());
              }
        }
    }).catch((err) => {
        dispatch(setError(err));
    });
    dispatch(setLoading(false));
}

export const login = (user:{username:string, password:string}) => async (dispatch:any) => {
    dispatch(setLoading(true));
    await axios.post(loginRoute,
        user,
    {
        withCredentials:true
    }).then((response:any) => {
        if (response.error){
            dispatch(setError(response.error));
        }else{
            if (typeof window !== "undefined") {
                localStorage.setItem("shopfriend-user", JSON.stringify(response.data.returnedUser));
                dispatch(setUser(response.data.returnedUser));
                dispatch(clearError());
              }
        }
    }).catch((err) => {
        dispatch(setError(err));
    });
    dispatch(setLoading(false));
}

export const isAuth = () => (dispatch:any) => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("shopfriend-user")) {
        const data : string | null = localStorage.getItem("shopfriend-user");
        if (data) dispatch(setUser(JSON.parse(data)));
    } else {
        return false;
    }
  };

export const {setLoading, setUser, setUserLogout} = authSlice.actions;
export const  selectAuth = (state:RootState) => state.auth;
export default authSlice.reducer;
