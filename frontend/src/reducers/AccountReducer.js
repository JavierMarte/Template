import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching account details
export const fetchAccountDetails = createAsyncThunk(
    'account/fetchAccountDetails',
    async ({ userId, user }, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/account/getAccountDetails/${userId}`);
        return response.data.details;
      } catch (err) {
        if (err.response.status === 404) {
          const newAccount = {
            subscription: "standard",
            name: user.name,
            address: "",
            companyname: "",
            email: user.email,
            paymentmethod: "",
            settings: {},
            userid: userId,
            accCode: user.accCode,
          };
          const response = await axios.post(`${process.env.REACT_APP_BACKEND}/account/addAccountDetails`, newAccount);
          return response.data.details;
        } else {
          return rejectWithValue(err.response.data);
        }
      }
    }
  );
  

// Async thunk for updating account details
export const updateAccountDetails = createAsyncThunk(
  'account/updateAccountDetails',
  async ({ userId, accountData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND}/account/editAccountDetails/${userId}`,
        accountData
      );
      return response.data.updatedDetails;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    accountData: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAccountDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accountData = action.payload;
      })
      .addCase(fetchAccountDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateAccountDetails.fulfilled, (state, action) => {
        state.accountData = action.payload;
      });
  },
});

export default accountSlice.reducer;
