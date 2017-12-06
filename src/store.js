import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import thunk from "redux-thunk";

import { appReducer, APP_REDUCER } from "./app";

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
  [APP_REDUCER]: appReducer,
});

let middlewares = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

const store = createStore(reducer, {}, composeEnhancers(applyMiddleware(...middlewares)));

export default store;
