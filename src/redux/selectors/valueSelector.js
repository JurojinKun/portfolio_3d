import { createSelector } from '@reduxjs/toolkit';

export const selectValues = createSelector(
  (state) => state.values,
  (values) => values
);