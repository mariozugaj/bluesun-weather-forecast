import * as actionTypes from "redux/actionTypes";
import { geocode } from "helpers";
import { addRecentLocation, deleteRecentLocation } from "modules/recentLocations";

export function clearLocation() {
  return {
    type: actionTypes.CLEAR_LOCATION,
  };
}

export function deleteVisitedLocation(coordinates) {
  return (dispatch, getState) => {
    return dispatch({
      type: actionTypes.DELETE_VISITED_LOCATION,
      payload: {
        coordinates,
      },
    });
  };
}

function checkLocationCount() {
  return (dispatch, getState) => {
    const visitedLocations = getState().locations.visited;
    const recentLocations = getState().recentLocations;

    if (recentLocations.length > 5) {
      const leastRecentLocation = Object.values(visitedLocations)
        .filter(location => recentLocations.includes(location.coordinates))
        .sort((a, b) => (a.visitedAt > b.visitedAt ? 1 : -1))[0];

      dispatch(deleteRecentLocation(leastRecentLocation.coordinates));
    }
  };
}

export function addNewVisitedSuccess(locationData) {
  return (dispatch, getState) => {
    const locationAlreadyVisited = Object.keys(getState().locations.visited).includes(
      locationData.coordinates
    );
    if (locationAlreadyVisited) return null;
    dispatch({
      type: actionTypes.ADD_NEW_VISITED_SUCCESS,
      payload: {
        locationData,
        visitedAt: Date.now(),
      },
    });
    dispatch(addRecentLocation(locationData.coordinates));
    dispatch(checkLocationCount());
  };
}

function addNewVisited(coordinates) {
  return dispatch => {
    geocode(coordinates)
      .then(locationData => {
        dispatch(addNewVisitedSuccess(locationData));
        dispatch(getLocationSuccess(locationData.coordinates));
      })
      .catch(error => dispatch(getLocationFailure(error)));
  };
}

function getLocationSuccess(coordinates) {
  return {
    type: actionTypes.GET_LOCATION_SUCCESS,
    payload: {
      coordinates,
      visitedAt: Date.now(),
    },
  };
}

function getLocationFailure(error) {
  return {
    type: actionTypes.GET_LOCATION_FAILURE,
    payload: {
      error,
    },
  };
}

export function getLocation(coordinates) {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.GET_LOCATION_BEGIN });

    const locationAlreadyVisited = Object.keys(getState().locations.visited).includes(coordinates);
    if (locationAlreadyVisited) {
      return dispatch(getLocationSuccess(coordinates));
    }
    return dispatch(addNewVisited(coordinates));
  };
}

const initialState = {
  isLoading: false,
  error: null,
  currentLocation: null,
  visited: {
    "28.763204,-17.893081": {
      visitedAt: 1532440211059,
      label: "Observatorio del Roque de los Muchachos",
      coordinates: "28.763204,-17.893081",
    },
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_LOCATION_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.GET_LOCATION_SUCCESS:
      return {
        ...state,
        currentLocation: action.payload.coordinates,
        isLoading: false,
        error: null,
        visited: {
          ...state.visited,
          [action.payload.coordinates]: {
            ...state.visited[action.payload.coordinates],
            visitedAt: action.payload.visitedAt,
          },
        },
      };
    case actionTypes.GET_LOCATION_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case actionTypes.ADD_NEW_VISITED_SUCCESS:
      return {
        ...state,
        error: null,
        visited: {
          ...state.visited,
          [action.payload.locationData.coordinates]: {
            ...action.payload.locationData,
            visitedAt: action.payload.visitedAt,
          },
        },
      };
    case actionTypes.CLEAR_LOCATION:
      return {
        ...state,
        currentLocation: null,
      };
    case actionTypes.DELETE_VISITED_LOCATION:
      const newState = { ...state };
      delete newState.visited[action.payload.coordinates];
      return newState;
    default:
      return state;
  }
}
