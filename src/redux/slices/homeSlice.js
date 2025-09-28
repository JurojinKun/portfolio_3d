import { createSlice } from "@reduxjs/toolkit";

const initialState = { offset: 0 };

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setHomeOffset: (state, action) => {
      state.offset = action.payload;
    },
    resetHomeOffset: (state) => {
      state.offset = 0;
    },
  },
});

export const { setHomeOffset, resetHomeOffset } = homeSlice.actions;

export default homeSlice.reducer;
