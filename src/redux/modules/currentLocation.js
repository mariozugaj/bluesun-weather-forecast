import { geocode, coordinatesToString } from "helpers";
import { browserHistory } from "containers/App";
import { visitLocation } from "modules/visitedLocations";

const SET_LOCATION_BEGIN = "SET_LOCATION_BEGIN";
const SET_LOCATION = "SET_LOCATION";
const GET_CURRENT_POSITION_BEGIN = "GET_CURRENT_POSITION_BEGIN";
const GET_CURRENT_POSITION_SUCCESS = "GET_CURRENT_POSITION_SUCCESS";
const GET_CURRENT_POSITION_FAILURE = "GET_CURRENT_POSITION_FAILURE";
const CLEAR_LOCATION = "CLEAR_LOCATION";
const START_SEARCHING = "START_SEARCHING";
const STOP_SEARCHING = "STOP_SEARCHING";

export function startSettingLocation() {
  return {
    type: SET_LOCATION_BEGIN,
  };
}

export function setLocation(location) {
  return dispatch => {
    dispatch({
      type: SET_LOCATION,
      payload: {
        ...location,
      },
    });
    dispatch(visitLocation(location));
  };
}

export function clearLocation() {
  return {
    type: CLEAR_LOCATION,
  };
}

export function getCurrentPositionSuccess() {
  return {
    type: GET_CURRENT_POSITION_SUCCESS,
  };
}

export function getCurrentPositionFailure(error) {
  return {
    type: GET_CURRENT_POSITION_FAILURE,
    error,
  };
}

export function getCurrentPosition() {
  return dispatch => {
    dispatch({ type: GET_CURRENT_POSITION_BEGIN });
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const latlng = { lat: coords.latitude, lng: coords.longitude };
        return geocode(latlng).then(locationData => {
          dispatch(getCurrentPositionSuccess());
          return browserHistory.push(`/forecast/daily/${coordinatesToString(locationData)}`);
        });
      },
      error => {
        return dispatch(getCurrentPositionFailure(error));
      }
    );
  };
}

export function setLocationFromParams(coordinates) {
  return dispatch => {
    return geocode(coordinates).then(locationData => dispatch(setLocation(locationData)));
  };
}

export function startSearching() {
  return {
    type: START_SEARCHING,
  };
}

export function stopSearching() {
  return {
    type: STOP_SEARCHING,
  };
}

const initialState = {
  isLocating: false,
  isSearching: false,
  isSettingLocation: false,
  error: null,
  lat: null,
  lng: null,
  label: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOCATION_BEGIN:
      return {
        ...state,
        isSettingLocation: true,
      };
    case SET_LOCATION:
      return {
        ...state,
        ...action.payload,
        isLocating: false,
        isSettingLocation: false,
      };
    case GET_CURRENT_POSITION_BEGIN:
      return {
        ...state,
        isLocating: true,
      };
    case GET_CURRENT_POSITION_SUCCESS:
      return {
        ...state,
        error: null,
        isLocating: false,
      };
    case GET_CURRENT_POSITION_FAILURE:
      return {
        ...state,
        error: action.error,
        isLocating: false,
      };
    case CLEAR_LOCATION:
      return initialState;
    case START_SEARCHING:
      return {
        ...state,
        isSearching: true,
      };
    case STOP_SEARCHING:
      return {
        ...state,
        isSearching: false,
      };
    default:
      return state;
  }
}
