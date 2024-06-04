import { createSlice } from '@reduxjs/toolkit';

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
    Sunday: [9, 17]
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
  toneResponse: '',
  companyDetails: {
    name: 'Keller Realtors',
    address: '123 Main St, Anytown USA',
    phone: '+1 (555) 987-6543',
    email: 'info@company.com',
  },
};

const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    setSelectedListing(state, action) {
      state.selectedClient = action.payload;
    },    setListings(state, action) {
      state.selectedClientproperty = action.payload;
    },

  },
});

export const {
    setSelectedListing,
    setListings,

} = listingSlice.actions;

export default listingSlice.reducer;
