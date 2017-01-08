export const RESET_CONTROLLER = 'RESET_CONTROLLER';
export const PLAY_TRACK = 'PLAY_TRACK';
export const PAUSE_TRACK = 'PAUSE_TRACK';
export const STOP_TRACK = 'STOP_TRACK';
export const SET_TRACK = 'SET_TRACK';
export const SET_SPEED = 'SET_SPEED';
export const SET_POSITION = 'SET_POSITION';
export const SET_VOLUME = 'SET_VOLUME';
export const SET_VOLUME_COMMON = 'SET_VOLUME_COMMON';

export function resetDJCOntroller() {
	return {
		type: RESET_CONTROLLER,
	};
}

export function playTrack(player) {
	return {
		type: PLAY_TRACK,
		payload: {
			player,
		},
	};
}

export function pauseTrack(player) {
	return {
		type: PAUSE_TRACK,
		payload: {
			player,
		},
	};
}

export function stopTrack(player) {
	return {
		type: STOP_TRACK,
		payload: {
			player,
		},
	};
}

export function setTrack(player, index) {
	return {
		type: SET_TRACK,
		payload: {
			player,
			index,
		},
	};
}

export function setSpeed(player, speed) {
	return {
		type: SET_SPEED,
		payload: {
			player,
			speed,
		},
	};
}

export function setPosition(player, position) {
	return {
		type: SET_POSITION,
		payload: {
			player,
			position,
		},
	};
}

export function setVolume(player, volume) {
	return {
		type: SET_VOLUME,
		payload: {
			player,
			volume,
		},
	};
}

export function setVolumeCommon(volume) {
	return {
		type: SET_VOLUME_COMMON,
		payload: {
			volume,
		},
	};
}