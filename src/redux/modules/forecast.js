import { coordinatesToString } from "helpers";
import * as API from "api";
import * as actionTypes from "redux/actionTypes";

export function fetchForecastSuccess(forecast) {
  const { latitude, longitude, daily, hourly, currently, timezone } = forecast;
  return {
    type: actionTypes.FETCH_FORECAST_SUCCESS,
    payload: {
      location: coordinatesToString({ lat: latitude, lng: longitude }),
      forecast: {
        currently,
        daily,
        hourly,
        timezone,
        fetchedAt: Date.now(),
      },
    },
  };
}

export function fetchForecastFailure(error) {
  return {
    type: actionTypes.FETCH_FORECAST_FAILURE,
    error,
  };
}

function fetchForecast(location) {
  return dispatch => {
    dispatch({ type: actionTypes.FETCH_FORECAST_BEGIN });
    API.getForecast(location)
      .then(response => dispatch(fetchForecastSuccess(response)))
      .catch(error => dispatch(fetchForecastFailure(error)));
  };
}

function shouldFetchForecast(state, coordinates) {
  const forecast = state.forecast.byLocation[coordinates];
  const lastFetchedWithinAnHour =
    forecast && (new Date() - new Date(forecast.fetchedAt)) / 3600000 < 1;

  if (state.forecast.isFetching) {
    return false;
  } else if (!forecast) {
    return true;
  } else if (lastFetchedWithinAnHour) {
    return false;
  } else {
    return true;
  }
}

export function fetchForecastIfNeeded(coordinates) {
  return (dispatch, getState) => {
    if (shouldFetchForecast(getState(), coordinates)) {
      return dispatch(fetchForecast(coordinates));
    }
  };
}

export function deleteForecastForLocation(coordinates) {
  return {
    type: actionTypes.DELETE_FORECAST_FOR_LOCATION,
    payload: {
      coordinates,
    },
  };
}

const initialState = {
  isFetching: false,
  error: null,
  byLocation: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_FORECAST_BEGIN:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.FETCH_FORECAST_SUCCESS:
      return {
        isFetching: false,
        error: null,
        byLocation: {
          ...state.byLocation,
          [action.payload.location]: { ...action.payload.forecast },
        },
      };
    case actionTypes.FETCH_FORECAST_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    case actionTypes.DELETE_FORECAST_FOR_LOCATION:
      const newState = { ...state };
      delete newState.byLocation[action.payload.coordinates];
      return newState;
    default:
      return state;
  }
}
