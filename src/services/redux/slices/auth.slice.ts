import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from "../../../types/user.types";

const initialState: User = {
  id: "",
  accessToken: "",
  refreshToken: "",
  email: '',
  name: '',
  profile_pic: '',
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.profile_pic = action.payload.profile_pic;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      console.log("User added to Redux:", action.payload);
    },
    logout: (state) => {
      state.id = "";
      state.email = "";
      state.name = "";
      state.profile_pic = "";
      state.accessToken = "";
      state.refreshToken = "";
      console.log("User logged out");
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      Object.assign(state, action.payload);
      console.log("User updated in Redux:", action.payload);
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;