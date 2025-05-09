import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// enable Redux DevTools if available, otherwise fallback to standard compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create the Redux store with the root reducer, and apply the middleware
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)) // add Redux DevTools enhancer
);

// run the root saga
sagaMiddleware.run(rootSaga);

//console.log(store.getState());

export default store;
