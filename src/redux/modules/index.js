import { combineReducers } from "redux";

import locations from "modules/locations";
import search from "modules/search";
import forecast from "modules/forecast";
import map from "modules/map";
import currentPosition from "modules/currentPosition";
import favoriteLocations from "modules/favoriteLocations";
import recentLocations from "modules/recentLocations";

export default combineReducers({
  locations,
  search,
  forecast,
  map,
  currentPosition,
  favoriteLocations,
  recentLocations,
});
