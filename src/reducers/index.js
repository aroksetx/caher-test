import { combineReducers } from "redux";

import { locationsState } from "./locations.reducer";
import { authState } from "./auth.reducer";
import { nav } from "./navigation.reducer";

export default AppReducer = combineReducers({
  nav,
  authState,
  locationsState
});