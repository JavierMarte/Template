import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedClient: null,
  clients: [],
  availability: {
    Monday: [9, 17],
    Tuesday: [9, 17],
    Wednesday: [9, 17],
    Thursday: [9, 17],
    Friday: [9, 17],
    Saturday: [9, 17],
    Sunday: [9, 17],
  },
  enabledDays: {
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: true,
  },
  toneResponse: "",
  companyDetails: {
    name: "Keller Realtors",
    address: "123 Main St, Anytown USA",
    phone: "+1 (555) 987-6543",
    email: "info@company.com",
    companyname: "Keller Realtors Ltd.",
  },
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setSelectedClient(state, action) {
      state.selectedClient = action.payload;
    },
    setclientproperty(state, action) {
      state.selectedClientproperty = action.payload;
    },
    setClients(state, action) {
      state.clients = action.payload;
    },
    setAvailability(state, action) {
      state.availability = action.payload;
    },
    setEnabledDays(state, action) {
      state.enabledDays = action.payload;
    },
    setToneResponse(state, action) {
      state.toneResponse = action.payload;
    },
    setCompanyDetails(state, action) {
      state.companyDetails = action.payload;
    },
  },
});

export const {
  setSelectedClient,
  setClients,
  setAvailability,
  setEnabledDays,
  setToneResponse,
  setCompanyDetails,
  setclientproperty,
} = clientSlice.actions;

export default clientSlice.reducer;
