import {createSlice} from '@reduxjs/toolkit'
const token = localStorage.getItem("token");
console.log("token____",token);
const initialState={
    name:'user',
    loading :'false',
    isLoginIn:'null',
    token,
    success:'null',
    error:'false'

};
const userSlice=createSlice({
    name:"rahul",
    initialState,
    reducers:{
    loginSuccess: (state, action) => {
        state.isLoginIn = true;
        state.token = action.payload.token;
        state.error = null;
        console.log("hi rahul",action.payload.token);
        console.log("hi raj",state.token);
       
      },
  
      loginFailure: (state, action) => {
        state.isLoginIn = false;
        state.userToken = null;
        state.error = action.payload.error;
      },
    }
})

export const{ loginSuccess,loginFailure} =userSlice.actions
export default userSlice.reducer;