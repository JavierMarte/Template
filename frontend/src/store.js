import { configureStore } from '@reduxjs/toolkit';
import clientReducer from 'reducers/clientReducer';
import screeningReducer from 'reducers/screeningReducer';
import formReducer from 'reducers/formReducer';
import accountReducer from 'reducers/AccountReducer';

// Configure the store with a reducer
const store = configureStore({
  reducer: {
    client: clientReducer,
    screening: screeningReducer,
    form: formReducer,
    account: accountReducer,


    // Add more reducers here if needed
  },
});

export default store;
