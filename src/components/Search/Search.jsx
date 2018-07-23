import React from "react";

import { round, coordinatesToString } from "helpers";
import Icon from "components/Icon";
import SearchInput from "./SearchInput";

const Search = ({ startSearching, stopSearching, currentLocation, visitLocation, ...props }) => {
  const changeSearchMode = () => {
    if (currentLocation.isSearching) return stopSearching();
    startSearching();
  };

  const onSuggestSelect = suggest => {
    if (suggest && suggest.label !== "") {
      const {
        location: { lat, lng },
        label,
      } = suggest;
      const coordinates = coordinatesToString({ lat, lng });
      const locationData = {
        label,
        lat: round(lat),
        lng: round(lng),
        id: coordinates,
      };
      stopSearching();
      visitLocation(locationData);
      props.history.push(`/forecast/daily/${coordinates}`);
    }
  };

  return (
    <React.Fragment>
      <Icon
        name="search"
        className="page-header__item icon--clickable"
        size="20px"
        title="Seach for a location"
        onClick={changeSearchMode}
      />
      {currentLocation.isSearching && (
        <SearchInput onSuggestSelect={onSuggestSelect} changeSearchMode={changeSearchMode} />
      )}
    </React.Fragment>
  );
};

export default Search;
