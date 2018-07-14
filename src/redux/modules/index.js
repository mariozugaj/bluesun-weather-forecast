import { combineReducers } from "redux";

import currentLocation from "currentLocation";
import visitedLocations from "visitedLocations";
import forecasts from "forecasts";

export default combineReducers({
  currentLocation,
  visitedLocations,
  forecasts,
});
