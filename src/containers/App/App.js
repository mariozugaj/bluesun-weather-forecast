import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import routes from "routes";

export const browserHistory = createBrowserHistory();

const App = props => {
  return <Router history={browserHistory}>{routes}</Router>;
};

export default App;
