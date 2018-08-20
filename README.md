<h1 align="center">
  <br>
  <a href="http://bluesun.chanjman.me"><img src="https://raw.githubusercontent.com/chanjman/bluesun-weather-forecast/master/public/favicon.png" alt="BlueSun Weather Forecast" width="200"></a>
  <br>
  BlueSun Weather Forecast
  <br>
</h1>

<h4 align="center">A <a href="http://bluesun.chanjman.me">demo</a> project built while learning React and Redux.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#technical-notes">Technical notes</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

![screenshot](https://cl.ly/1R3w2z3W0s32/Screen%252520Recording%2525202018-08-20%252520at%25252010.12%252520AM.gif)

## Key Features
* Auto-suggest location while typing
* Weather forecast for current position
* Forecast not fetched on every load, persisted to local storage for an hour
* See 5-day forecast for 5 most recently visited locations on the homepage
* Add (and remove) location to favorites for a quick access from the homepage
* Switch units between metric and imperial
* Visualize weather data using graphs and map

## Technical notes
* Bootstrapped using [create-react-app](https://github.com/facebook/create-react-app)
* React 16.4 SPA
* Routing done using [React Router](https://github.com/ReactTraining/react-router)
* State management done using [Redux](https://github.com/reduxjs/redux) (following duck / module system), [Redux Thunk](https://github.com/reduxjs/redux-thunk) for middleware, [React Redux](https://github.com/reduxjs/react-redux) to connect React with Redux, [Reselect](https://github.com/reduxjs/reselect) to select specific parts of the state
* [Redux persist](https://github.com/rt2zz/redux-persist) used to persist data to Local Storage (visited locations, favorite locations, units preference, etc.)
* Location searching and geocoding is done using [Google Places API](https://developers.google.com/places/web-service/intro); [React Geosuggest library](https://github.com/ubilabs/react-geosuggest) is used for autosuggestions
* Data visualization is accomplished using [vx](https://github.com/hshoff/vx), React wrapper for d3
* Forecast data and map embed are from [Dark Sky](https://darksky.net)
* All icons are `svg` (sprites)
* ESLint is used as a source code styling guide

## Credits

This software uses / was inspired by:

- [yr.no](https://yr.no/en) - some design features
- [Dark Sky](https://darksky.net) - forecast data, map, and some design features
- [Adam Whitcroft's Climacons](http://adamwhitcroft.com/climacons/) - weather icons
- [Flaticon](https://www.flaticon.com), [Freepik](http://www.freepik.com) - other icons
- [Jack Rugile's amazing rainbow loader](https://codepen.io/jackrugile/pen/JddmaX)

## License

MIT
