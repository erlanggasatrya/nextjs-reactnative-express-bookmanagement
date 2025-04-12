import { combineReducers } from "redux";
import { authDataReducers } from "./authData";

export const rootReducer = combineReducers({
  authData: authDataReducers,
});
