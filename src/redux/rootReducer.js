import { combineReducers } from "redux";

import valueReducer from './slices/valueSlice';

const rootReducer = combineReducers({
    values: valueReducer
});

export default rootReducer;