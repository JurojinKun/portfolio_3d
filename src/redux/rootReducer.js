import { combineReducers } from "redux";

// import valueReducer from './slices/valueSlice';
// import animationReducer from './slices/animationSphereSlice';
import languageReducer from './slices/languageSlice';

const rootReducer = combineReducers({
    // values: valueReducer,
    // animation: animationReducer,
    language: languageReducer,
});

export default rootReducer;