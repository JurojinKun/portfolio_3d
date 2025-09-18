import { createSlice } from "@reduxjs/toolkit";

const initialState = { offset: 0 };

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setHomeOffset: (state, action) => {
      state.offset = action.payload;
    },
  },
});

export const { setHomeOffset } = homeSlice.actions;

export default homeSlice.reducer;
