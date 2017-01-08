import React from 'react';
import { Route, Redirect } from 'react-router';

import UploadPage from './containers/UploadPage/UploadPage';
import DJControllerPage from './containers/DJControllerPage/DJControllerPage';

export const getRoutes = store => {
	const tracksPresent = (nextState, replace) => {
		const { left, right } = store.getState().tracks;

		if (!left.data.length && !right.data.length) {
			replace('/upload');
		}
	};

	return (
		<Route>
			<Route path="/upload" component={UploadPage} />
			<Route
				path="/dj-controller"
				component={DJControllerPage}
				onEnter={tracksPresent}
			/>
			<Redirect from="*" to="/upload" />
		</Route>
	);
};
