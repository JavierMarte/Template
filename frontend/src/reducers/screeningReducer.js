// reducers/screeningReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPerson: null,
  finresult: null,
  output: null,
  peopleData: [],
  showFilter: false,
  showSort: false,
  dateFilter: "A",
  sortBy: "Group",
  sortOrder: "asc",
  searchTerm: "",
  agentemail: "",
  showReport: false,
  isMobile: false,
  loading: false,
  sliderValue: 0,
};

const screeningSlice = createSlice({
  name: "screening",
  initialState,
  reducers: {
    setSelectedPerson: (state, action) => {
      state.selectedPerson = action.payload;
    },
    setFinResult: (state, action) => {
      state.finresult = action.payload;
    },
    setOutput: (state, action) => {
      state.output = action.payload;
    },
    setPeopleData: (state, action) => {
      state.peopleData = action.payload;
    },
    setShowFilter: (state, action) => {
      state.showFilter = action.payload;
    },
    setShowSort: (state, action) => {
      state.showSort = action.payload;
    },
    setDateFilter: (state, action) => {
      state.dateFilter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setAgentEmail: (state, action) => {
      state.agentemail = action.payload;
    },
    setShowReport: (state, action) => {
      state.showReport = action.payload;
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setIsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSliderValue: (state, action) => {
      state.sliderValue = action.payload;
    },
    setCondition: (state, action) => {
      state.condition = action.payload;
    },
    setFilteredPeopleData: (state, action) => {
      state.filteredPeopleData = action.payload;
    },
    removeSelectedPerson: (state) => {
      state.peopleData = state.peopleData.filter(
        (person) =>
          JSON.stringify(person) !== JSON.stringify(state.selectedPerson)
      );
      state.selectedPerson = null;
      state.finresult = null;
    },
  },
});

export const {
  setSelectedPerson,
  setPeopleData,
  setFinResult,
  setOutput,
  setIsLoading,
  setShowFilter,
  setShowSort,
  setDateFilter,
  setSortBy,
  setSortOrder,
  setSearchTerm,
  setAgentEmail,
  setShowReport,
  setIsMobile,
  setSliderValue,
  setCondition,
  removeSelectedPerson,
  setFilteredPeopleData,
} = screeningSlice.actions;

export default screeningSlice.reducer;
