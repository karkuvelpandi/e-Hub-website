import createSagaMiddleware from "redux-saga";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootSaga from "./sagas";
const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }),
  sagaMiddleware,
];
export default configureStore({
  reducer: {},
  middleware,
  //   devTools:,
  //   enhancers:,
});
sagaMiddleware.run(rootSaga);
