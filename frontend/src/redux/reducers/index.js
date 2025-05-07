import { combineReducers } from "redux";
import authReducer from "./authReducer";
import teamReducer from "./teamReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  teams: teamReducer,
  user: userReducer,
});

export default rootReducer;
