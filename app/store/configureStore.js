import prodStore from './configureStore.prod';
import devStore from './configureStore.dev';
let configureStore;

if (process.env.NODE_ENV === 'production') {
	configureStore = prodStore;
} else {
	configureStore = devStore;
}

export default configureStore;