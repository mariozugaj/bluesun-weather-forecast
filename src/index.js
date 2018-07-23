import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "index.css";
import configureStore from "store";
import App from "containers/App";
import registerServiceWorker from "registerServiceWorker";
import LoadingModal from "components/LoadingModal";

const { persistor, store } = configureStore();

render(
  <Provider store={store}>
    <PersistGate loading={<LoadingModal />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
