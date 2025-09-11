import { combineReducers } from "redux";

import languageReducer from './slices/languageSlice';

const rootReducer = combineReducers({
    language: languageReducer
});

export default rootReducer;