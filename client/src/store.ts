import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authSlice';
import errorReducer from "./features/errorSlice";
import cartReducer from './features/cartSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        error: errorReducer,
        cart:cartReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch