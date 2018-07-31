import React from "react";
import PropTypes from "prop-types";

import Icon from "components/Icon";

const Favorite = ({
  addFavoriteLocation,
  deleteFavoriteLocation,
  currentLocation: { coordinates },
  favoriteLocations,
}) => {
  const isFavorite = favoriteLocations.includes(coordinates);

  if (isFavorite) {
    return (
      <Icon
        name="star"
        className="page-header__item icon--clickable"
        title="Remove current location from favorites"
        alt="Remove current location from favorites"
        size={20}
        onClick={() => deleteFavoriteLocation(coordinates)}
      />
    );
  }
  return (
    <Icon
      name="star-empty"
      className="page-header__item icon--clickable"
      title="Add current location to favorites"
      alt="Add current location to favorites"
      size={20}
      onClick={() => addFavoriteLocation(coordinates)}
    />
  );
};

Favorite.propTypes = {
  addFavoriteLocation: PropTypes.func.isRequired,
  deleteFavoriteLocation: PropTypes.func.isRequired,
  currentLocation: PropTypes.shape({
    coordinates: PropTypes.string,
    label: PropTypes.string,
    visitedAt: PropTypes.number,
  }),
  favoriteLocations: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Favorite;
