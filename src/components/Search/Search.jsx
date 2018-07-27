import React from "react";

import Icon from "components/Icon";
import SearchInput from "./SearchInput";
import { coordinatesToString } from "helpers";

const Search = ({ startSearching, stopSearching, isSearching, ...props }) => {
  const changeSearchMode = () => {
    if (isSearching) return stopSearching();
    startSearching();
  };

  const onSuggestSelect = suggest => {
    if (suggest && suggest.label !== "") {
      const {
        location: { lat, lng },
        label,
      } = suggest;
      const coordinates = coordinatesToString({ lat, lng });
      stopSearching();
      props.addNewVisitedSuccess({ label, coordinates });
      props.history.push(`/forecast/daily/${coordinates}`);
    }
  };

  return (
    <React.Fragment>
      <Icon
        name="search"
        className="page-header__item icon--clickable"
        size="20px"
        title="Search for a location"
        onClick={changeSearchMode}
      />
      {isSearching && (
        <SearchInput onSuggestSelect={onSuggestSelect} changeSearchMode={changeSearchMode} />
      )}
    </React.Fragment>
  );
};

export default Search;
