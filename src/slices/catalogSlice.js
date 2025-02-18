import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    currentCategory: null,
  },
  reducers: {
    setCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
