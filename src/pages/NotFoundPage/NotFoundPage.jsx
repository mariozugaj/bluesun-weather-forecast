import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="center-page-text-wrapper">
      <h2>We were unable to find what you were searching for. Try again?</h2>
      <Link to="/">
        <button className="redirect-button">Go to the homepage</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
