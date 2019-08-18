import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const HeaderNav = ({ coordinates = "" }) => {
  return (
    <nav>
      <ol className="page-header__nav">
        <li className="page-header__nav__item">
          <NavLink
            to={`/forecast/daily/${coordinates}`}
            className="page-header__nav__anchor"
          >
            Overview
          </NavLink>
        </li>
        <li className="page-header__nav__item">
          <NavLink
            to={`/forecast/hourly/${coordinates}`}
            className="page-header__nav__anchor"
          >
            Details
          </NavLink>
        </li>
        <li className="page-header__nav__item">
          <NavLink
            to={`/forecast/map/${coordinates}`}
            className="page-header__nav__anchor"
          >
            Map
          </NavLink>
        </li>
      </ol>
    </nav>
  );
};

HeaderNav.propTypes = {
  coordinates: PropTypes.string.isRequired,
};

export default HeaderNav;
