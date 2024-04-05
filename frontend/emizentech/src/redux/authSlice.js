import {createSlice} from '@reduxjs/toolkit'
const token = localStorage.getItem("token");
console.log("token____",token);
const initialState={
    // name:'user',
    loading :'false',
    isLoginIn:'null',
    isprofileIn:'null',
    token,
    success:'null',
    error:'false',
    user: JSON.parse(localStorage.getItem('userData')),
};

const userSlice=createSlice({
    name:"rahul",
    initialState,
    reducers:{
    loginSuccess: (state, action) => {
        state.isLoginIn = true;
        state.token = action.payload;
        state.error = null;
        // console.log("hi rahul",action.payload);
        // console.log("hi raj",state.token);
       
      },
  
      loginFailure: (state, action) => {
        state.isLoginIn = false;
        state.userToken = null;
        state.error = action.payload.error;
      },
      profileSuccess: (state, action) => {
        state.isprofileIn = true;
        state.user = action.payload;
        state.error = null;
       

        console.log("hi raj",action.payload);
       
      },
  
      profileFailure: (state, action) => {
        state.isprofileIn = false;
        state.userToken = null;
        state.error = action.payload.error;
      },

    }
})

export const{ loginSuccess,loginFailure,profileSuccess,profileFailure} =userSlice.actions
export default userSlice.reducer;