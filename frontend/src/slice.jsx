import { createSlice } from "@reduxjs/toolkit";

export const loggedSlice = createSlice({
    name: 'logged',

    // initial state
    initialState: {
        loggedIn:false
    },

    // reducers
    reducers: {
        login: () => {return {loggedIn:true}},
        logout: () => {return {loggedIn:false}}
    }  
})

export const {login} = loggedSlice.actions;
export const {logout} = loggedSlice.actions;

export default loggedSlice.reducer;