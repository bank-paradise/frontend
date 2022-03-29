import { configureStore } from "@reduxjs/toolkit";

// Reducers
import userReducer from "features/authentication/user.model";
import communityRecuder from "features/community/community.model";
import bankReducer from "features/bank/bank.model";

export const store = configureStore({
  reducer: {
    user: userReducer,
    community: communityRecuder,
    bank: bankReducer,
  },
});
