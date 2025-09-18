import { createSelector } from "@reduxjs/toolkit";

const homeState = (state) => state.home;

export const homeSelector = createSelector(
  [homeState],
  (homeOffsetState) => homeOffsetState.offset
);
