import React from "react";

import DarkSkyLogo from "darkskylogo.png";

export default () => {
  return (
    <a className="powered-by" href="https://darksky.net/poweredby/">
      <img src={DarkSkyLogo} alt="Dark Sky" />
      <p>
        Powered by <strong>Dark Sky</strong>
      </p>
    </a>
  );
};
