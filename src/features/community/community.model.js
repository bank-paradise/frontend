import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  fetchCommunity,
  fetchJoinCommunity,
  fetchCreateCommunity,
  fetchUpdateCommunity,
} from "api/community";

const initialState = {
  header: { status: "nothing" },
  invitations: [],
  informations: {},
  accounts: {
    personnal: [],
    professional: [],
  },
};

export const getCommunity = createAsyncThunk("community/get", async () => {
  const response = await fetchCommunity();
  return response;
});

export const joinCommunity = createAsyncThunk(
  "community/join",
  async (invitation) => {
    const response = await fetchJoinCommunity(invitation);
    return response;
  }
);

export const createCommunity = createAsyncThunk(
  "community/create",
  async (invitation) => {
    const response = await fetchCreateCommunity(invitation);
    return response;
  }
);

export const updateCommunity = createAsyncThunk(
  "community/update",
  async (payload) => {
    const response = await fetchUpdateCommunity(payload);
    return response;
  }
);

export const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getCommunity.fulfilled, (state, action) => {
      state.informations = action.payload.response.community;
      state.invitations = action.payload.response.invitations;
      state.accounts = action.payload.response.accounts;
      state.header.status = "done";
    });
    builder.addCase(joinCommunity.fulfilled, (state, action) => {
      state.informations = action.payload.response.community;
      state.invitations = action.payload.response.invitations;
      state.accounts = action.payload.response.accounts;
      state.header.status = "done";
    });
    builder.addCase(createCommunity.fulfilled, (state, action) => {
      state.informations = action.payload.response.community;
      state.invitations = [];
      state.header.status = "done";
    });
    builder.addCase(updateCommunity.fulfilled, (state, action) => {
      state.informations = action.payload.response.community;
      state.header.status = "done";
    });
  },
});

export const communityInfo = (state) => state.community.informations;
export const invitationsList = (state) => state.community.invitations;
export const communityStatus = (state) => state.community.header.status;
export const communityAccounts = (state) => state.community.accounts;

export default communitySlice.reducer;
