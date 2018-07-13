import { coordinatesToString } from "../../utils/utils";
import * as API from "../../api";

const FETCH_FORECAST_BEGIN = "FETCH_FORECAST_BEGIN";
const FETCH_FORECAST_SUCCESS = "FETCH_FORECAST_SUCCESS";
const FETCH_FORECAST_FAILURE = "FETCH_FORECAST_FAILURE";

export function fetchForecastSuccess(forecast) {
  const { latitude, longitude, daily, hourly, timezone } = forecast;
  return {
    type: FETCH_FORECAST_SUCCESS,
    payload: {
      location: coordinatesToString({ lat: latitude, lng: longitude }),
      forecast: {
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
    type: FETCH_FORECAST_FAILURE,
    error,
  };
}

function fetchForecast(location) {
  return dispatch => {
    dispatch({ type: FETCH_FORECAST_BEGIN });
    API.getForecast(location)
      .then(response => dispatch(fetchForecastSuccess(response)))
      .catch(error => dispatch(fetchForecastFailure(error)));
  };
}

function shouldFetchForecast(state, location) {
  const forecast = state.forecasts[location];
  const lastFetchedWithinAnHour =
    forecast && (new Date() - new Date(forecast.fetchedAt)) / 3600000 < 1;

  if (!forecast) {
    return true;
  } else if (forecast.isFething) {
    return false;
  } else if (lastFetchedWithinAnHour) {
    return false;
  } else {
    return true;
  }
}

export function fetchForecastIfNeeded(location) {
  return (dispatch, getState) => {
    if (shouldFetchForecast(getState(), location)) {
      return dispatch(fetchForecast(location));
    }
  };
}

const initialState = {
  isFething: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FORECAST_BEGIN:
      return {
        ...state,
        isFething: true,
      };
    case FETCH_FORECAST_SUCCESS:
      return {
        ...state,
        [action.payload.location]: { ...action.payload.forecast },
        isFething: false,
      };
    case FETCH_FORECAST_FAILURE:
      return {
        ...state,
        ...action.error,
        isFething: false,
      };
    default:
      return state;
  }
}
