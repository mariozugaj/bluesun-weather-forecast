import React, { Component } from "react";
import Geosuggest from "react-geosuggest";

export class SearchInput extends Component {
  geosuggestRef = React.createRef();

  componentDidMount() {
    this.geosuggestRef.current.focus();
  }

  handleKeyDown = (event, target) => {
    if (event.keyCode === 27) {
      return this.props.changeSearchMode();
    }
  };

  handleBlur = () => {
    return this.props.changeSearchMode();
  };

  render() {
    return (
      <Geosuggest
        ref={this.geosuggestRef}
        onSuggestSelect={this.props.onSuggestSelect}
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
        placeholder="Search for a location..."
        types={["geocode"]}
        ignoreTab
        ignoreEnter
      />
    );
  }
}

export default SearchInput;
