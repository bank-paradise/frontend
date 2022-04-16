import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchBankInformations,
  fetchCreateCompany,
  fetchCreateTransaction,
} from "api/bank";

const initialState = {
  header: { status: "nothing" },
  accounts: [],
  transactions: [],
  statistics: {
    incoming: 0,
    outgoing: 0,
  },
  currency: "EUR",
};

export const getBank = createAsyncThunk("bank/get", async () => {
  const response = await fetchBankInformations();
  return response;
});

export const createTransaction = createAsyncThunk(
  "bank/transaction/create",
  async (transaction) => {
    const response = await fetchCreateTransaction(transaction);
    return response;
  }
);

export const createCompany = createAsyncThunk(
  "bank/company/create",
  async (payload) => {
    const response = await fetchCreateCompany(payload);
    return response;
  }
);

export const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getBank.fulfilled, (state, action) => {
      if (action.payload.status === "done") {
        state.accounts = action.payload.response.accounts;
        state.transactions = action.payload.response.transactions;
        state.currency = action.payload.response.currency;
        state.statistics = action.payload.response.statistics;
        state.header.status = "done";
      }
    });
    builder.addCase(createTransaction.fulfilled, (state, action) => {
      if (action.payload.status === "done") {
        state.transactions.push(action.payload.response.transaction);
        const accountIndex = state.accounts.findIndex(
          (account) => account.rib === action.payload.response.account.rib
        );

        state.accounts[accountIndex] = action.payload.response.account;
        state.header.status = "done";
      }
    });
    builder.addCase(createCompany.fulfilled, (state, action) => {
      if (action.payload.status === "done") {
        state.accounts.push(action.payload.response.account);
      }
    });
  },
});

export const bankTransactions = (state) => state.bank.transactions;
export const bankAccounts = (state) => state.bank.accounts;
export const bankPersonalAccount = (state) => {
  return (
    state.bank.accounts.filter((account) => account.type === "personnal")[0] ||
    null
  );
};
export const bankProfessionalAccounts = (state) => {
  return (
    state.bank.accounts.filter((account) => account.type === "professional") ||
    null
  );
};
export const bankCurrentcy = (state) => state.bank.currency;
export const bankAllInfo = (state) => state.bank;
export const bankStatistics = (state) => state.bank.statistics;

export default bankSlice.reducer;
