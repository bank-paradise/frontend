import { configureStore } from "@reduxjs/toolkit";

// Reducers
import userReducer from "features/authentication/user.model";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
