import classNames from "classnames";

const coordinatesRegexp = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

export function round(number, precision = 6) {
  const shift = (number, precision, reverseShift) => {
    if (reverseShift) {
      precision = -precision;
    }
    const numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? +numArray[1] + precision : precision));
  };
  return shift(Math.round(shift(number, precision, false)), precision, true);
}

export function geocode(coordinates) {
  const { lat, lng } = coordinates;
  const defaultResult = {
    label: "Middle of nowhere",
    lat,
    lng,
    id: `${lat},${lng}`,
  };

  return new Promise((resolve, reject) => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: coordinates }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          const { formatted_address } = results[0];

          return resolve({
            label: formatted_address,
            lat,
            lng,
            id: `${lat},${lng}`,
          });
        } else {
          return resolve(defaultResult);
        }
      } else {
        return resolve(defaultResult);
      }
    });
  });
}

export function coordinatesToString({ lat, lng }) {
  return `${round(lat)},${round(lng)}`;
}

function validCoordinates(coordinates) {
  return coordinatesRegexp.test(coordinates);
}

export function trimCoordinates(coordinates) {
  return coordinates.split(",").map(coordinate => {
    parseFloat(coordinate);
    return round(coordinate);
  });
}

export function extractCoordinates(coordinates) {
  if (!validCoordinates(coordinates)) {
    throw new Error("Not valid coordinates");
  }
  return trimCoordinates(coordinates);
}

export function nextDays(n) {
  return function() {
    const days = ["Today"];
    const names = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const today = new Date().toLocaleDateString("en-GB", { weekday: "long" });
    let index = names.indexOf(today) + 1;

    for (let i = 1; i < n; i++) {
      days.push(names[index]);
      index === names.length - 1 ? (index = 0) : index++;
    }
    return days;
  };
}

export function titleize(string) {
  return string.replace(/^[a-z]|[A-Z]/g, (v, i) => {
    return i === 0 ? v.toUpperCase() : " " + v.toUpperCase();
  });
}

export function uvClass(uvIndex) {
  return classNames({
    uv: true,
    green: uvIndex <= 2.9,
    yellow: uvIndex >= 3 && uvIndex <= 5.9,
    orange: uvIndex >= 6 && uvIndex <= 7.9,
    red: uvIndex >= 8 && uvIndex <= 10.9,
    violet: uvIndex >= 11,
  });
}

export function tempClass(temperature) {
  return classNames({
    "temperature--warm": temperature > 0,
    "temperature--cold": temperature <= 0,
  });
}
