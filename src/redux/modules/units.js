import * as actionTypes from "redux/actionTypes";

export function changeUnits(units) {
  return {
    type: actionTypes.CHANGE_UNITS,
    payload: { units },
  };
}

const initialState = {
  currentUnits: "si",
  entities: {
    si: {
      temperature: "C",
      windSpeed: "m/s",
      precipitation: "mm",
      precipitationPerHour: "mm/h",
      pressure: "hPa",
      visibility: "km",
      freezingPoint: 0,
    },
    us: {
      temperature: "F",
      windSpeed: "mph",
      precipitation: "in",
      precipitationPerHour: "in/h",
      pressure: "mb",
      visibility: "mi",
      freezingPoint: 32,
    },
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_UNITS:
      return {
        ...state,
        currentUnits: action.payload.units,
      };
    default:
      return state;
  }
}
