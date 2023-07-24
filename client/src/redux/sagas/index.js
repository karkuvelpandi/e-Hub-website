import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    // all sagas which will export form all saga files.
  ]);
}
