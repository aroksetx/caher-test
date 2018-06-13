import { combineReducers } from "redux";

import { locationsState } from "./Locations.reducer";
import { authState } from "./Auth.reducer";
import { nav } from "./Navigation.reducer";

export default AppReducer = combineReducers({
  nav,
  authState,
  locationsState
});