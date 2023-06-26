import { createSelector } from '@reduxjs/toolkit';

const selectLanguageState = state => state.language;

export const selectLanguage = createSelector(
  [selectLanguageState],
  (languageState) => languageState.language
);