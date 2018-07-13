import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./modules";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = applyMiddleware(thunk);

export default () => {
  const store = createStore(persistedReducer, composeEnhancers(middleware));
  const persistor = persistStore(store);
  return { store, persistor };
};
