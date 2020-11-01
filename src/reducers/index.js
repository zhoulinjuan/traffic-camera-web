import { combineReducers } from 'redux';
import trafficCam from './reducers';
import reducers from './reducers';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'login',
  storage: storageSession
};

const rootReducer = combineReducers({
  login: persistReducer(persistConfig, trafficCam),
  store: reducers
});

export default rootReducer;
