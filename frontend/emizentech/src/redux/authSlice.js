import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: "false",
  isLoginIn: {},
  user:{},
  success: "null",
  error: "false",
};

const userSlice = createSlice({
  name: "rahul",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;

      state.error = null;
      console.log("hi rahul", state.user);
    },

    loginFailure: (state, action) => {
      state.isLoginIn = false;
      state.userToken = null;
      state.error = action.payload.error;
    },
  },
});

export const { loginSuccess, loginFailure, clearState } = userSlice.actions;
export default userSlice.reducer;
