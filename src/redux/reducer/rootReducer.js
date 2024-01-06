import { combineReducers } from "redux";
import userReducer from "./userReducer";
import countReducer from "./counterReducer";//import vao de redux biet su ton tai 

const rootReducer = combineReducers({
    user: userReducer,
    counter: countReducer
});
export default rootReducer;