import React from "react";

import { round } from "helpers";
import Icon from "components/Icon";
import SearchInput from "./SearchInput";

const Search = props => {
  const changeSearchMode = () => {
    if (props.currentLocation.isSearching) return props.stopSearching();
    props.startSearching();
  };

  const onSuggestSelect = suggest => {
    if (suggest && suggest.label !== "") {
      const coordinates = `${round(suggest.location.lat)},${round(suggest.location.lng)}`;
      props.history.push(`/forecast/daily/${coordinates}`);
      props.stopSearching();
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
      {props.currentLocation.isSearching && (
        <SearchInput onSuggestSelect={onSuggestSelect} changeSearchMode={changeSearchMode} />
      )}
    </React.Fragment>
  );
};

export default Search;
