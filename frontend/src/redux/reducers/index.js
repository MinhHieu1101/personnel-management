import { combineReducers } from "redux";
import authReducer from "./authReducer";
import teamReducer from "./teamReducer";
import userReducer from "./userReducer";
import { LOGOUT } from "../actions/authActions";

const rootReducer = combineReducers({
  auth: authReducer,
  team: teamReducer,
  user: userReducer,
});

//export default rootReducer;

export default (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return rootReducer(state, action);
};
