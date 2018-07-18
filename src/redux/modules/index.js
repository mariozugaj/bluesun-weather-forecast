import { combineReducers } from "redux";

import forecasts from "forecasts";
import currentLocation from "modules/currentLocation";
import visitedLocations from "modules/visitedLocations";

export default combineReducers({
  currentLocation,
  visitedLocations,
  forecasts,
});
