import { combineReducers } from "redux";

import currentLocation from "modules/currentLocation";
import visitedLocations from "modules/visitedLocations";
import forecast from "modules/forecast";
import map from "modules/map";

export default combineReducers({
  currentLocation,
  visitedLocations,
  forecast,
  map,
});
