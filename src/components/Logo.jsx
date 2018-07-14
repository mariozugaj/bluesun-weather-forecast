import React from "react";
import { Link } from "react-router-dom";

import Icon from "Icon";

const Logo = props => {
  return (
    <Link to="/">
      <Icon name="logo" title="Go to homepage" alt="BlueSun Weather Forecast" size={45} />
    </Link>
  );
};

export default Logo;
