import { createSlice } from "@reduxjs/toolkit";

export const loggedSlice = createSlice({
    // name
    name: 'logged',

    // initial state
    initialState: {
        loggedIn: false,
        id: 0,
        userType: 'none',
    },

    // reducers
    reducers: {
        login: (state, action) => {
            const { id, userType } = action.payload;
            state.loggedIn = true;
            state.id = id;
            state.userType = userType;
        },
        logout: (state) => {
            state.loggedIn = false;
            state.id = 0;
            state.userType = 'none';
        }
    }  
})

export const { login, logout } = loggedSlice.actions;

export default loggedSlice.reducer;
