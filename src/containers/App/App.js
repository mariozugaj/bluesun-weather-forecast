import React from "react";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Routes from "routes";
import Header from "containers/Header";

export const browserHistory = createBrowserHistory();

const App = () => {
  return (
    <Router history={browserHistory}>
      <Route
        render={({ location }) => (
          <React.Fragment>
            <Header />
            <TransitionGroup component={null}>
              <CSSTransition key={location.key} classNames="fade" timeout={250}>
                <Routes location={location} />
              </CSSTransition>
            </TransitionGroup>
          </React.Fragment>
        )}
      />
    </Router>
  );
};

export default App;
