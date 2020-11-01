import { REQUEST, SUCCESS, FAILURE, createAction } from '../utils/reduxUtils';
import * as types from '../actionTypes';

export const requestTrafficImages = {
  request: (datetime) =>
    createAction(types.requestTrafficImages[REQUEST], { datetime }),
  success: (data) =>
    createAction(types.requestTrafficImages[SUCCESS], { data }),
  failure: (status) =>
    createAction(types.requestTrafficImages[FAILURE], { status })
};

export const requestWeatherForecast = {
  request: (datetime) =>
    createAction(types.requestWeatherForecast[REQUEST], { datetime }),
  success: (data) =>
    createAction(types.requestWeatherForecast[SUCCESS], { data }),
  failure: (status) =>
    createAction(types.requestWeatherForecast[FAILURE], { status })
};

export const requestLocation = {
  request: (latLng, appKey) =>
    createAction(types.requestLocation[REQUEST], { latLng, appKey }),
  success: (data) => createAction(types.requestLocation[SUCCESS], { data }),
  failure: (status) => createAction(types.requestLocation[FAILURE], { status })
};
