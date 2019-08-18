import React from "react";
import PropTypes from "prop-types";

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
        size={20}
        title="Search for a location"
        alt="Search for a location"
        onClick={changeSearchMode}
      />
      {isSearching && (
        <SearchInput
          onSuggestSelect={onSuggestSelect}
          changeSearchMode={changeSearchMode}
        />
      )}
    </React.Fragment>
  );
};

Search.propTypes = {
  isSearching: PropTypes.bool.isRequired,
  startSearching: PropTypes.func.isRequired,
  stopSearching: PropTypes.func.isRequired,
  addNewVisitedSuccess: PropTypes.func.isRequired,
};

export default Search;
