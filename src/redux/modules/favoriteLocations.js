import * as actionTypes from "redux/actionTypes";
import { moveRecentToFavorite } from "modules/recentLocations";

export function addFavoriteLocation(coordinates) {
  return dispatch => {
    dispatch({
      type: actionTypes.ADD_FAVORITE_LOCATION,
      payload: {
        coordinates,
      },
    });
    dispatch(moveRecentToFavorite(coordinates));
  };
}

export function deleteFavoriteLocation(coordinates) {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.DELETE_FAVORITE_LOCATION,
      payload: {
        coordinates,
      },
    });
  };
}

const initialState = ["28.763204,-17.893081"];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_FAVORITE_LOCATION:
      return [...state, action.payload.coordinates];
    case actionTypes.DELETE_FAVORITE_LOCATION:
      const index = state.findIndex(location => location === action.payload.coordinates);
      return [...state.slice(0, index), ...state.slice(index + 1)];

    default:
      return state;
  }
}
