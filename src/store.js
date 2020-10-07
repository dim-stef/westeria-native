import {configureStore} from '@reduxjs/toolkit';
import {authenticationSlice} from './features/authentication/authenticationSlices';

export default configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
  },
});
