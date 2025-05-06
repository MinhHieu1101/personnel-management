import { combineReducers } from "redux";
import authReducer from "./authReducer";
import teamReducer from "./teamReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  teams: teamReducer,
});

export default rootReducer;
