import { createSlice } from "@reduxjs/toolkit";

interface Error {
    message: string,
}

const initialState : Error = {
    message: "",
}

const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setError: (state, action) => {
            state.message = action.payload;
        },
        clearError: (state) => {
            state.message = "";
        },
    },
});

export const {setError, clearError} = errorSlice.actions;
export default errorSlice.reducer;
export const selectError = (state:any) => state.error;