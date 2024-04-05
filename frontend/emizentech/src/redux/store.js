import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice';
const store= configureStore({
    reducer :{
       isLoginIn:authSlice,
       isprofileIn:authSlice
    }
})
export default store;