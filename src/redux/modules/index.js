import { combineReducers } from "redux";

import currentLocation from "./currentLocation";
import forecasts from "./forecasts";

export default combineReducers({
  currentLocation,
  forecasts,
});
