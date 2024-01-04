import { combineReducers } from "redux";
import userReducer from "./userReducer";
import countReducer from "./counterReducer";

const rootReducer = combineReducers({
    user: userReducer,
    counter: countReducer
});
export default rootReducer;