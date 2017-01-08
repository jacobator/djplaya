import React, { Component, PropTypes } from 'react';

import './TracksPlayer.scss';
import PlayerButton from '../PlayerButton/PlayerButton';
import TrackTimeline from '../TrackTimeline/TrackTimeline';
import TrackVolume from '../TrackVolume/TrackVolume';

const LOW_SPEED = 0.5;
const NORMAL_SPEED = 1;
const HIGH_SPEED = 2;

class TracksPlayer extends Component {
	constructor(props) {
		super(props);

		this.initTrack(this.props.controller.index);
	}

	initTrack(index, cb) {
		if (this.track) {
			this.stop();
		}
		this.track = this.props.tracks.data[index];
		this.props.setPosition(0);
		this.props.controller.playing && this.play();
		if (this.track) {
			this.setVolume(null, this.props.controller.volume);
			this.setSpeed(this.props.controller.speed);
			this.track.song.onended = () => {
				this.changeIndex(1);
			};
		}
		cb && cb(index);
	}

	getTrackNumber(index, total) {
		return total ? `${index + 1} / ${total}` : '- / -';
	}

	getTrackName() {
		return this.track ? this.track.name : <i>playlist is empty</i>;
	}

	play(cb) {
		this.props.pingTrack();
		this.track.song.play();
		cb && cb();
	}

	pause(cb) {
		this.props.unPingTrack();
		this.track.song.pause();
		cb && cb();
	}

	stop(cb) {
		this.props.unPingTrack();
		this.track.song.pause();
		this.setPosition(null, 0);
		cb && cb();
	}

	setSpeed(speed, cb) {
		this.track.song.playbackRate = speed;
		cb && cb(speed);
	}

	changeIndex(delta) {
		const { tracks, controller, setTrack } = this.props;
		const currentIndex = controller.index;
		const index = currentIndex + delta;
		const maxIndex = tracks.data.length - 1;
		const newIndex = index < 0 ? maxIndex : index > maxIndex ? 0 : index;

		this.initTrack(newIndex);
		setTrack(newIndex);
	}

	setPosition(cb, position) {
		this.track.song.currentTime = position;

		cb && cb(position);
	}

	setVolume(cb, volume) {
		this.track.song.volume = this.props.commonVolume / 100 * volume / 100;

		cb && cb(volume);
	}

	render() {
		const { tracks, controller, playTrack, pauseTrack, stopTrack, setSpeed,
			setPosition, setVolume } = this.props;

		return (
			<div className="tracks-player">
				<div className="controls">
					<div className="buttons">
						<PlayerButton
							icon="play"
							active={controller.playing}
							onClick={this.play.bind(this, playTrack)}
							disabled={!tracks.data.length}
						/>
						<PlayerButton
							icon="pause"
							active={!controller.playing}
							onClick={this.pause.bind(this, pauseTrack)}
							disabled={!tracks.data.length}
						/>
						<PlayerButton
							icon="stop"
							onClick={this.stop.bind(this, stopTrack)}
							disabled={!tracks.data.length}
						/>
						<PlayerButton
							icon="backward"
							active={controller.speed === LOW_SPEED}
							onClick={this.setSpeed.bind(this,
								controller.speed === LOW_SPEED ? NORMAL_SPEED : LOW_SPEED,
								setSpeed)}
							disabled={!tracks.data.length}
						/>
						<PlayerButton
							icon="forward"
							active={controller.speed === HIGH_SPEED}
							onClick={this.setSpeed.bind(this,
								controller.speed === HIGH_SPEED ? NORMAL_SPEED : HIGH_SPEED,
								setSpeed)}
							disabled={!tracks.data.length}
						/>
						<PlayerButton
							icon="step-backward"
							onClick={this.changeIndex.bind(this, -1)}
							disabled={tracks.data.length < 2}
						/>
						<PlayerButton
							icon="step-forward"
							onClick={this.changeIndex.bind(this, 1)}
							disabled={tracks.data.length < 2}
						/>
						</div>
					<TrackVolume
						value={controller.volume}
						max={100}
						onChange={this.setVolume.bind(this, setVolume)}
						disabled={!tracks.data.length}
					/>
				</div>
				<div className="player-display">
					<div className="track-number">
						{this.getTrackNumber(controller.index, tracks.data.length)}
					</div>
					<div className="track-name">
						{this.getTrackName()}
					</div>
				</div>
				<TrackTimeline
					value={controller.position}
					max={this.track ? this.track.song.duration : 0}
					onChange={this.setPosition.bind(this, setPosition)}
					disabled={!tracks.data.length}
				/>
			</div>
		);
	}
}

TracksPlayer.propTypes = {
	tracks: PropTypes.object.isRequired,
	controller: PropTypes.object.isRequired,
	playTrack: PropTypes.func.isRequired,
	pauseTrack: PropTypes.func.isRequired,
	stopTrack: PropTypes.func.isRequired,
	setSpeed: PropTypes.func.isRequired,
	setPosition: PropTypes.func.isRequired,
	setVolume: PropTypes.func.isRequired,
	setTrack: PropTypes.func.isRequired,
	commonVolume: PropTypes.number.isRequired,
	pingTrack: PropTypes.func.isRequired,
	unPingTrack: PropTypes.func.isRequired,
};

export default TracksPlayer;