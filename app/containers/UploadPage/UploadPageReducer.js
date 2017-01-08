import _ from 'lodash';

import { LOAD_TRACKS_START, LOAD_TRACKS_END, REMOVE_TRACK } from './UploadPageActions';

let initialState = {
	left: {
		loading: false,
		data: [],
	},
	right: {
		loading: false,
		data: [],
	},
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	let delta = payload ? _.cloneDeep(state[payload.player]) : null;

	switch (type) {
		case LOAD_TRACKS_START:
			delta.loading = true;

			return Object.assign({}, state, {
				[payload.player]: delta,
			});
		case LOAD_TRACKS_END:
			delta.loading = false;
			delta.data = delta.data.concat(payload.tracks);

			return Object.assign({}, state, {
				[payload.player]: delta,
			});
		case REMOVE_TRACK:
			delta.data.splice(payload.index, 1);

			return Object.assign({}, state, {
				[payload.player]: delta,
			});
		default:
			return state;
	}
}