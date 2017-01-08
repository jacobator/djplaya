import _ from 'lodash';
import { RESET_CONTROLLER, PLAY_TRACK, PAUSE_TRACK, STOP_TRACK, SET_TRACK,
	SET_SPEED, SET_POSITION, SET_VOLUME,
	SET_VOLUME_COMMON } from './DJControllerPageActions';

let initialState = {
	left: {
		index: 0,
		playing: false,
		speed: 1,
		position: 0,
		volume: 100,
	},
	right: {
		index: 0,
		playing: false,
		speed: 1,
		position: 0,
		volume: 100,
	},
	common: {
		volume: 100,
	}
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	let delta = payload ? _.cloneDeep(state[payload.player]) : null;

	switch (type) {
		case RESET_CONTROLLER:
			return Object.assign({}, initialState);
		case PLAY_TRACK:
			delta.playing = true;

			return Object.assign({}, state, {
				[payload.player]: delta,
			});
		case PAUSE_TRACK:
			delta.playing = false;

			return Object.assign({}, state, {
				[payload.player]: delta,
			});
		case STOP_TRACK:
			delta.playing = false;
			delta.position = 0;

			return Object.assign({}, state, {
				[payload.player]: delta,
			});
		case SET_TRACK:
			delta.index = payload.index;

			return Object.assign({}, state, {
				[payload.player]: delta,
			});
		case SET_SPEED:
			delta.speed = payload.speed;

			return Object.assign({}, state, {
				[payload.player]: delta,
			});
		case SET_POSITION:
			delta.position = payload.position;

			return Object.assign({}, state, {
				[payload.player]: delta,
			});
		case SET_VOLUME:
			delta.volume = payload.volume;

			return Object.assign({}, state, {
				[payload.player]: delta,
			});
		case SET_VOLUME_COMMON:
			delta = _.cloneDeep(state.common);
			delta.volume = payload.volume;

			return Object.assign({}, state, {
				common: delta,
			});
		default:
			return state;
	}
}