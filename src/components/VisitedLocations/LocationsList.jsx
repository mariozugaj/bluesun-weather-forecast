const WeatherSymbol = ({ summary, condition, temperature }) => {
  return (
    <figure className="weather-location-list__icon-wrapper">
      <Icon name={condition} title={summary} size={50} />
      <span className="temperature--warm">{round(temperature, 0)}°</span>
    </figure>
  );
};

const DataRow = props => {
  const mappedWeatherSymbols = props.forecast.data.slice(0, 5).map(day => {
    return (
      <WeatherSymbol
        condition={day.icon}
        summary={day.summary}
        temperature={day.apparentTemperatureHigh}
        key={day.time}
      />
    );
  });
  return (
    <Link to={`/forecast/daily/${props.linkLocation}`} className="weather-location-list__data-row">
      <h3 className="weather-location-list__location-name">{props.label}</h3>
      {mappedWeatherSymbols}
    </Link>
  );
};

const HeadingRow = props => {
  const headingDayNames = nextDays(5)().map(dayName => <span key={dayName}>{dayName}</span>);
  return <header className="weather-location-list__heading-row">{headingDayNames}</header>;
};

const EmptyHomeStatus = () => (
  <div className="center-page-text-wrapper">
    <h2>As it turns out, you haven't yet visited any locations.</h2>
  </div>
);
