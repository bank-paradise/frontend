import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchUser,
} from "api/authentication";

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

export const logout = createAsyncThunk("user/logout", async () => {
  const response = await fetchLogout();
  return { success: response.status === "done" };
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
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.status === "error") {
        state.header.status = "error";
        return;
      }
      // if (
      //   !navigator.cookieEnabled &&
      //   !navigator.storage &&
      //   !navigator.storage.persist &&
      //   !navigator.storage.persisted
      // ) {
      //   alert(
      //     "Veuillez activer les cookies, ou utiliser un navigateur plus récent"
      //   );
      //   return;
      // }
      state.header.status = "done";
      state.header.connected = true;
      state.data = action.payload.response.user;
      cookies.set("::token", action.payload.response.token, {
        path: "/",
      });
      localStorage.setItem("::token", action.payload.response.token);
    });
    builder.addCase(registration.fulfilled, (state, action) => {
      if (action.payload.status === "error") {
        state.header.status = "error";
        return;
      }
      // if (
      //   !navigator.cookieEnabled &&
      //   !navigator.storage &&
      //   !navigator.storage.persist &&
      //   !navigator.storage.persisted
      // ) {
      //   alert(
      //     "Veuillez activer les cookies, ou utiliser un navigateur plus récent"
      //   );
      //   return;
      // }

      state.header.status = "done";
      state.header.connected = true;
      state.data = action.payload.response.user;
      cookies.set("::token", action.payload.response.token, {
        path: "/",
      });
      localStorage.setItem("::token", action.payload.response.token);
    });

    builder.addCase(check.pending, (state, action) => {
      state.header.status = "loading";
    });
    builder.addCase(check.fulfilled, (state, action) => {
      if (action.payload.status === "error") {
        cookies.remove("::token");
        localStorage.removeItem("::token");
        return;
      }
      state.header.status = "done";
      state.header.connected = true;
      state.data = action.payload.response.user;
    });

    builder.addCase(logout.pending, (state, action) => {
      state.header.status = "loading";
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      if (action.payload.success) {
        cookies.remove("::token");
        localStorage.removeItem("::token");
        state.header = initialState.header;
        state.data = initialState.data;
      }
    });
  },
});

export const { removeUser } = userSlice.actions;

export const userData = (state) => state.user.data;
export const userHeader = (state) => state.user.header;
export const allUserData = (state) => state.user;

export default userSlice.reducer;
