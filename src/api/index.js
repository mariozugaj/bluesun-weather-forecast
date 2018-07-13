import axios from "axios";

export function getForecast(coordinates) {
  const url = `/darkskyproxy/${
    process.env.REACT_APP_DARK_SKY_API_SECRET
  }/${coordinates}?units=si&exclude=currently,minutely,flags,alerts&extend=hourly`;

  return axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => Promise.reject(error));
}
