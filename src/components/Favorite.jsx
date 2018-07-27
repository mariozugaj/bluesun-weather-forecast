import React from "react";

import Icon from "components/Icon";

export default ({
  addFavoriteLocation,
  deleteFavoriteLocation,
  currentLocation,
  favoriteLocations,
}) => {
  const isFavorite = favoriteLocations.includes(currentLocation.coordinates);

  if (isFavorite) {
    return (
      <Icon
        name="star"
        className="page-header__item icon--clickable"
        title="Remove current location from favorites"
        size="20px"
        onClick={() => deleteFavoriteLocation(currentLocation.coordinates)}
      />
    );
  }
  return (
    <Icon
      name="star-empty"
      className="page-header__item icon--clickable"
      title="Add current location to favorites"
      size="20px"
      onClick={() => addFavoriteLocation(currentLocation.coordinates)}
    />
  );
};
