import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', //'authenticated' - 'not-authenticated'
    user: {},
    errorMessage: undefined,
  },
  reducers: {
    onChecking: ( state ) => {
      state.status = 'chenking';
      state.user = {};
      state.errorMessage = undefined;
    },
    onLoging: ( state, {payload}) => {
        state.status = 'authenticated';
        state.user = payload;
        state.errorMessage = undefined;
    },
    onLogout: ( state, {payload}) => {
      state.status = 'not-authenticated';
      state.user = {},
      state.errorMessage = payload;
    },
    clearErrorMessage: ( state ) => {
      state.errorMessage = undefined;
    },

  }
})

export const { onChecking, onLoging, onLogout, clearErrorMessage } = authSlice.actions
export default authSlice.reducer