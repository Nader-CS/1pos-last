import {createSlice} from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    token: null,
  },
  reducers: {
    resetToken: state => {
      state.token = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {resetToken, setToken} = tokenSlice.actions;

export const tokenReducer = tokenSlice.reducer;
