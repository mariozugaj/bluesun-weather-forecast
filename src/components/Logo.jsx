import React from "react";
import { Link } from "react-router-dom";

import Icon from "components/Icon";

const Logo = () => {
  return (
    <Link to="/" className="page-header__logo">
      <Icon
        name="logo"
        title="Go to homepage"
        alt="BlueSun Weather Forecast"
        size={45}
      />
    </Link>
  );
};

export default Logo;
