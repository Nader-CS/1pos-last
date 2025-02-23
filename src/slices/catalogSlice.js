import {api} from '@/services';
import {createSlice} from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    currentCategory: null,
  },
  reducers: {
    setCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
});

export const {setCategory} = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;

const paymentMethod = createSlice({
  name: 'paymentMethod',
  initialState: {
    method: null,
  },
  reducers: {
    setPaymentMethod: (state, action) => {
      state.method = action.payload;
    },
    resetPaymentMethod: () => {
      return {};
    },
  },
});
export const {setPaymentMethod, resetPaymentMethod} = paymentMethod.actions;
export const paymentMethodReducer = paymentMethod.reducer;
