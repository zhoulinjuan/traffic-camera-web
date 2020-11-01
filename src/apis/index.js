import Fetch from '../utils/fetch';
import api from './api.json';

export async function requestTrafficImages(datetime) {
  return Fetch.get(api.getTrafficImages + datetime);
}
export async function requestWeatherForecast(datetime) {
  return Fetch.get(api.getWeatherForecast + datetime);
}

export async function requestLocation(latLng, appKey) {
  return Fetch.get(api.getLocation + 'latlng=' + latLng + '&key=' + appKey);
}
