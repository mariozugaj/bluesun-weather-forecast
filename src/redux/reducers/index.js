import { combineReducers } from "redux";

const inititalCurrentLocationState = {};

export function currentLocationReducer(state = inititalCurrentLocationState, action) {
  return state;
}

export default combineReducers({
  currentLocation: currentLocationReducer,
});
