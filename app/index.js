import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { getRoutes } from './routes';
import configureStore from './store/configureStore';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Provider store={store}>
		<Router history={history} routes={getRoutes(store)} />
	</Provider>, document.getElementById('app')
);