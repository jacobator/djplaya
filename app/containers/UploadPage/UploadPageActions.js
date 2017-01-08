export const LOAD_TRACKS_START = 'LOAD_TRACKS_START';
export const LOAD_TRACKS_END = 'LOAD_TRACKS_END';
export const REMOVE_TRACK = 'REMOVE_TRACK';

export function loadTracksStart(player) {
	return {
		type: LOAD_TRACKS_START,
		payload: {
			player,
		},
	};
}

export function loadTracksEnd(player, tracks) {
	return {
		type: LOAD_TRACKS_END,
		payload: {
			player,
			tracks,
		},
	};
}

export function removeTrack(player, index) {
	return {
		type: REMOVE_TRACK,
		payload: {
			player,
			index,
		},
	};
}