import { createSlice } from '@reduxjs/toolkit';

const initialState = [1.5, -1, 7];

const valueSlice = createSlice({
  name: 'values',
  initialState,
  reducers: {
    updateValues: (state, action) => {
      return action.payload;
    }
  }
});

export const { updateValues } = valueSlice.actions;

export default valueSlice.reducer;
