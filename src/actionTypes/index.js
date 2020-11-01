import { createRequestType } from '../utils/reduxUtils';

export const requestTrafficImages = createRequestType('REQUEST_TRAFFIC_IMAGES');

export const requestWeatherForecast = createRequestType(
  'REQUEST_WEATHER_FORECAST'
);

export const requestLocation = createRequestType('REQUEST_LOCATION');
