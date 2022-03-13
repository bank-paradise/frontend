import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const initialState = {
  header: { status: "nothing", connected: false },
  data: null,
};

export const connexion = createAsyncThunk("user/login", async (payload) => {
  // request...
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser: (state) => {
      state.header = { ...initialState.header };
      state.user = { ...initialState.user };
      cookies.remove("::token");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(connexion.pending, (state) => {
        state.header.status = "loading";
      })
      .addCase(connexion.fulfilled, (state, action) => {
        state.header.status = "done";
        state.user += action.payload;
      });
  },
});

export const { removeUser } = userSlice.actions;

export const userData = (state) => state.user.data;
export const allUserData = (state) => state.user;

export default userSlice.reducer;
