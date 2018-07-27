import { createSelector } from "reselect";

export const getCurrentLocation = createSelector(
  [state => state.locations.currentLocation, state => state.locations.visited],
  (coordinates, visitedLocations) => visitedLocations[coordinates]
);

export const getRecentLocations = createSelector(
  [state => state.recentLocations, state => state.locations.visited],
  (recentLocations, visitedLocations) => {
    if (recentLocations.length === 0) return [];
    return recentLocations
      .map(location => visitedLocations[location])
      .sort((a, b) => (a.visitedAt < b.visitedAt ? 1 : -1));
  }
);

export const getFavoriteLocations = createSelector(
  [state => state.favoriteLocations, state => state.locations.visited],
  (favoriteLocations, visitedLocations) => {
    if (favoriteLocations.length === 0) return [];
    return favoriteLocations.map(location => visitedLocations[location]);
  }
);
