// formSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks for async actions
export const fetchAgent = createAsyncThunk(
  'form/fetchAgent',
  async ({ email, formCode }, thunkAPI) => {
    const api = process.env.REACT_APP_API_URL;
    try {
      const agentResponse = await axios.get(`${api}/agents/byemail/${email}`);
      const propertyResponse = await axios.get(`${api}/property/bycode/${formCode}`);
      return { agent: agentResponse.data.agent, property: propertyResponse.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
  'form/createUser',
  async (newUser, thunkAPI) => {
    const api = process.env.REACT_APP_API_URL;
    try {
      const response = await axios.post(`${api}/clients/create`, newUser);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const formSlice = createSlice({
  name: 'form',
  initialState: {
    userForm: {
      name: '',
      email: '',
      number: '',
      address: '',
      password: '',
      lastactive: new Date(),
    },
    agentInfo: null,
    propertyInfo: null,
    errors: {},
    loading: false,
  },
  reducers: {
    updateUserForm: (state, action) => {
      state.userForm = { ...state.userForm, ...action.payload };
    },
    clearForm: (state) => {
      state.userForm = { name: '', email: '', number: '', address: '', password: '' };
      state.agentInfo = null;
      state.propertyInfo = null;
      state.errors = {};
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    clearErrors: (state) => {
      state.errors = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAgent.fulfilled, (state, action) => {
        state.loading = false;
        state.agentInfo = action.payload.agent;
        state.propertyInfo = action.payload.property;
      })
      .addCase(fetchAgent.rejected, (state, action) => {
        state.loading = false;
        state.errors = { fetchAgent: action.payload };
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userForm = { name: '', email: '', number: '', address: '', password: '' };
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.errors = { createUser: action.payload };
      });
  },
});

export const { updateUserForm, clearForm, setErrors, clearErrors } = formSlice.actions;
export default formSlice.reducer;
