import { createSelector } from '@reduxjs/toolkit';

const selectAnimationState = state => state.animation;

export const selectShouldAnimate = createSelector(
  [selectAnimationState],
  (animationState) => animationState.shouldAnimate
);