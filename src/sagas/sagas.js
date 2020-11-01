import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import { REQUEST } from '../utils/reduxUtils';
import * as apis from '../apis';
import * as actions from '../actions';

const responseCheck = (data) => {
  if (data.api_info.status === 'healthy') {
    return true;
  } else {
    throw new Error(data.api_info.status);
  }
};

function* fetchTrafficImages({ datetime }) {
  try {
    const result = yield call(apis.requestTrafficImages, datetime);
    yield call(responseCheck, result);
    yield put(actions.requestTrafficImages.success(result.items));
  } catch (error) {
    yield put(actions.requestTrafficImages.failure(error));
  }
}

function* fetchWeatherForecast({ datetime }) {
  try {
    const result = yield call(apis.requestWeatherForecast, datetime);
    yield call(responseCheck, result);
    yield put(actions.requestWeatherForecast.success(result));
  } catch (error) {
    yield put(actions.requestWeatherForecast.failure(error));
  }
}

function* fetchLocation({ latLng, appKey }) {
  try {
    const result = yield call(apis.requestLocation, latLng, appKey);
    if (result.status === 'OK') {
      yield put(actions.requestLocation.success(result));
    } else {
      throw new Error(result.status);
    }
  } catch (error) {
    yield put(actions.requestLocation.failure(error));
  }
}

export default function* Sagas() {
  yield takeLatest(
    actionTypes.requestTrafficImages[REQUEST],
    fetchTrafficImages
  );
  yield takeLatest(
    actionTypes.requestWeatherForecast[REQUEST],
    fetchWeatherForecast
  );
  yield takeEvery(actionTypes.requestLocation[REQUEST], fetchLocation);
}
