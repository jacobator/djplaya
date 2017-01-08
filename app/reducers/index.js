import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';

import tracks from '../containers/UploadPage/UploadPageReducer';
import controller from '../containers/DJControllerPage/DJControllerPageReducer';

const rootReducer = combineReducers({
	routing: routerReducer,
	tracks,
	controller,
});

export default rootReducer;