import {configureStore} from "@reduxjs/toolkit";
import loggedReducer from "./slice";
// eslint-disable-next-line react-refresh/only-export-components
export default configureStore({
    reducer: {
        logged: loggedReducer
    }
})