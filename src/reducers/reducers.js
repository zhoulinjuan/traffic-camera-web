import * as types from '../actionTypes';
import { REQUEST, SUCCESS, FAILURE, createReducer } from '../utils/reduxUtils';

export const initialState = {
  trafficImagesList: [],
  areaDataList: [],
  forecastList: [],
  isLoading: false,
  isLoadingWF: false,
  objPosition: []
};

export default createReducer(initialState, {
  //get traffic Images reducers
  [types.requestTrafficImages[REQUEST]](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [types.requestTrafficImages[SUCCESS]](state, action) {
    return {
      ...state,
      trafficImagesList: action.data,
      isLoading: false
    };
  },
  [types.requestTrafficImages[FAILURE]](state) {
    return {
      ...state,
      trafficImagesList: [],
      isLoading: false
    };
  },

  //get weather forecast reducers
  [types.requestWeatherForecast[REQUEST]](state) {
    return {
      ...state,
      isLoadingWF: true
    };
  },
  [types.requestWeatherForecast[SUCCESS]](state, action) {
    return {
      ...state,
      areaDataList: action.data.area_metadata,
      forecastList: action.data.items,
      isLoadingWF: false
    };
  },
  [types.requestWeatherForecast[FAILURE]](state) {
    return {
      ...state,
      areaDataList: [],
      forecastList: [],
      isLoadingWF: false
    };
  },

  //get position reducers
  [types.requestLocation[REQUEST]](state) {
    return {
      ...state
    };
  },
  [types.requestLocation[SUCCESS]](state, action) {
    return {
      ...state,
      objPosition: action.data.results,
      isLoadingWF: false
    };
  },
  [types.requestLocation[FAILURE]](state) {
    return {
      ...state,
      objPosition: [],
      isLoadingWF: false
    };
  }
});
