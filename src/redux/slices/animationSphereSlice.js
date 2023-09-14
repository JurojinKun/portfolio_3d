import { createSlice } from '@reduxjs/toolkit';

const initialState = { shouldAnimate: false };

const animationSlice = createSlice({
  name: 'animation',
  initialState,
  reducers: {
    startAnimation: (state) => {
      state.shouldAnimate = true;
    },
    resetAnimation: (state) => {
      state.shouldAnimate = false;
    },
  },
});

export const { startAnimation, resetAnimation } = animationSlice.actions;

export default animationSlice.reducer;

