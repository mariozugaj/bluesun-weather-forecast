import React, { Component } from "react";

import "./Search.css";
import { round } from "../utils/utils";
import Icon from "./Icon";
import SearchInput from "./SearchInput";

export class Search extends Component {
  changeSearchMode = () => {
    if (this.props.currentLocation.isSearching) return this.props.stopSearching();
    this.props.startSearching();
  };

  onSuggestSelect = suggest => {
    if (suggest && suggest.label !== "") {
      const coordinates = `${round(suggest.location.lat)},${round(suggest.location.lng)}`;
      this.props.history.push(`/forecast/daily/${coordinates}`);
      this.props.stopSearching();
    }
  };

  render() {
    const { isSearching } = this.props.currentLocation;

    return (
      <React.Fragment>
        <span className="page-header__icon">
          <Icon
            name="search"
            size="25px"
            title="Seach for a location"
            onClick={this.changeSearchMode}
          />
        </span>
        {isSearching && (
          <SearchInput
            onSuggestSelect={this.onSuggestSelect}
            changeSearchMode={this.changeSearchMode}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Search;
