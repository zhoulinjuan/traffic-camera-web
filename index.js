import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import createStore from './src/store';
import CssBaseline from '@material-ui/core/CssBaseline';

const { store, persistor } = createStore;

const WrappedRoot = ({ element }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Fragment>
          <CssBaseline />
          <div>{element}</div>
        </Fragment>
      </PersistGate>
    </Provider>
  );
};

export { WrappedRoot };
