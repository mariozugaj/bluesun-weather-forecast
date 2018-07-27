import * as actionTypes from "redux/actionTypes";
import { geocode, coordinatesToString } from "helpers";
import { browserHistory } from "containers/App";

export function getCurrentPositionSuccess() {
  return {
    type: actionTypes.GET_CURRENT_POSITION_SUCCESS,
  };
}

export function getCurrentPositionFailure(error) {
  return {
    type: actionTypes.GET_CURRENT_POSITION_FAILURE,
    payload: { error },
  };
}

export function getCurrentPosition() {
  return dispatch => {
    dispatch({ type: actionTypes.GET_CURRENT_POSITION_BEGIN });
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const coordinates = coordinatesToString({
          lat: coords.latitude,
          lng: coords.longitude,
        });
        return geocode(coordinates)
          .then(locationData => {
            dispatch(getCurrentPositionSuccess());
            return browserHistory.push(`/forecast/daily/${locationData.coordinates}`);
          })
          .catch(error => dispatch(getCurrentPositionFailure(error)));
      },
      error => dispatch(getCurrentPositionFailure(error))
    );
  };
}

const initialState = {
  isLocating: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_CURRENT_POSITION_BEGIN:
      return {
        ...state,
        isLocating: true,
      };
    case actionTypes.GET_CURRENT_POSITION_SUCCESS:
      return {
        ...state,
        error: null,
        isLocating: false,
      };
    case actionTypes.GET_CURRENT_POSITION_FAILURE:
      return {
        ...state,
        error: action.error,
        isLocating: false,
      };
    default:
      return state;
  }
}
