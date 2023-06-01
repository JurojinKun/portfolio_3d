import { combineReducers } from "redux";

import valueReducer from './slices/valueSlice';
import animationReducer from './slices/animationSphereSlice';

const rootReducer = combineReducers({
    values: valueReducer,
    animation: animationReducer
});

export default rootReducer;