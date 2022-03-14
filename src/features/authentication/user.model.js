import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLogin, fetchRegister, fetchUser } from "api/authentication";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const initialState = {
  header: { status: "nothing", connected: false },
  data: null,
};

export const login = createAsyncThunk("user/login", async (payload) => {
  const response = await fetchLogin(payload);
  return response;
});

export const registration = createAsyncThunk(
  "user/register",
  async (payload) => {
    const response = await fetchRegister(payload);
    return response;
  }
);

export const check = createAsyncThunk("user/me", async () => {
  const response = await fetchUser();
  return response;
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
      .addCase(login.pending, (state) => {
        state.header.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.status === "error") {
          state.header.status = "error";
          return;
        }
        state.header.status = "done";
        state.header.connected = true;
        state.data = action.payload.response.user;
        cookies.set("::token", action.payload.response.token, {
          path: "/",
        });
      })
      .addCase(registration.fulfilled, (state, action) => {
        if (action.payload.status === "error") {
          state.header.status = "error";
          return;
        }
        state.header.status = "done";
        state.header.connected = true;
        state.data = action.payload.response.user;
        cookies.set("::token", action.payload.response.token, {
          path: "/",
        });
      })
      .addCase(check.fulfilled, (state, action) => {
        if (action.payload.status === "error") {
          cookies.remove("::token");
          return;
        }
        state.header.status = "done";
        state.header.connected = true;
        state.data = action.payload.response.user;
      });
  },
});

export const { removeUser } = userSlice.actions;

export const userData = (state) => state.user.data;
export const userHeader = (state) => state.user.header;
export const allUserData = (state) => state.user;

export default userSlice.reducer;
