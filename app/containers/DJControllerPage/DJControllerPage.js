import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as djControllerPageActions from './DJControllerPageActions';
import './DJControllerPage.scss';
import TracksPlayer from '../../components/TracksPlayer/TracksPlayer';
import PlayerButton from '../../components/PlayerButton/PlayerButton';
import TrackVolume from '../../components/TrackVolume/TrackVolume';

class DJControllerPage extends Component {
	constructor() {
		super();
	}

	componentWillUnmount() {
		const { resetDJCOntroller } = this.props.actions;
		const { left , right } = this.getTracks();

		this.unPingTrack('left');
		if (left.song) {
			left.song.pause();
			left.song.currentTime = 0;
		}

		this.unPingTrack('right');
		if (right.song) {
			right.song.pause();
			right.song.currentTime = 0;
		}

		resetDJCOntroller();
	}

	openTraksManager() {
		this.context.router.push('/upload');
	}

	pingTrack(player) {
		this[`${player}interval`] = setInterval(() => {
			const { tracks, controller, actions } = this.props;

			actions.setPosition(player,
				tracks[player].data[controller[player].index].song.currentTime);
		}, 500);
	}

	unPingTrack(player) {
		clearInterval(this[`${player}interval`]);
	}

	getTracks() {
		const { tracks, controller } = this.props;
		const leftTrack = tracks.left.data[controller.left.index];
		const rightTrack = tracks.right.data[controller.right.index];

		return {
			left: {
				song: leftTrack ? leftTrack.song : null,
				controller: controller.left,
			},
			right: {
				song: rightTrack ? rightTrack.song : null,
				controller: controller.right,
			},
		};
	}

	play() {
		const { playTrack } = this.props.actions;
		const { left , right } = this.getTracks();

		if (left.song && !left.controller.playing) {
			this.pingTrack('left');
			left.song.play();
			playTrack('left');
		}

		if (right.song && !right.controller.playing) {
			this.pingTrack('right');
			right.song.play();
			playTrack('right');
		}
	}

	pause() {
		const { pauseTrack } = this.props.actions;
		const { left , right } = this.getTracks();

		if (left.song && left.controller.playing) {
			this.unPingTrack('left');
			left.song.pause();
			pauseTrack('left');
		}

		if (right.song && right.controller.playing) {
			this.unPingTrack('right');
			right.song.pause();
			pauseTrack('right');
		}
	}

	setVolume(volume) {
		const { tracks, controller, actions } = this.props;
		const leftTrack = tracks.left.data[controller.left.index];
		const rightTrack = tracks.right.data[controller.right.index];

		leftTrack && (leftTrack.song.volume = volume / 100 * controller.left.volume / 100);
		rightTrack && (rightTrack.song.volume = volume / 100 * controller.right.volume / 100);

		actions.setVolumeCommon(volume);
	}

	render() {
		const { tracks, controller, actions } = this.props;

		return (
			<div className="dj-controller-page">
				<div className="players">
					<div className="player">
						<TracksPlayer
							tracks={tracks.left}
							controller={controller.left}
							playTrack={actions.playTrack.bind(null, 'left')}
							pauseTrack={actions.pauseTrack.bind(null, 'left')}
							stopTrack={actions.stopTrack.bind(null, 'left')}
							setSpeed={actions.setSpeed.bind(null, 'left')}
							setTrack={actions.setTrack.bind(null, 'left')}
							setPosition={actions.setPosition.bind(null, 'left')}
							setVolume={actions.setVolume.bind(null, 'left')}
							commonVolume={controller.common.volume}
							pingTrack={this.pingTrack.bind(this, 'left')}
							unPingTrack={this.unPingTrack.bind(this, 'left')}
						/>
					</div>
					<div className="player">
						<TracksPlayer
							tracks={tracks.right}
							controller={controller.right}
							playTrack={actions.playTrack.bind(null, 'right')}
							pauseTrack={actions.pauseTrack.bind(null, 'right')}
							stopTrack={actions.stopTrack.bind(null, 'right')}
							setSpeed={actions.setSpeed.bind(null, 'right')}
							setTrack={actions.setTrack.bind(null, 'right')}
							setPosition={actions.setPosition.bind(null, 'right')}
							setVolume={actions.setVolume.bind(null, 'right')}
							commonVolume={controller.common.volume}
							pingTrack={this.pingTrack.bind(this, 'right')}
							unPingTrack={this.unPingTrack.bind(this, 'right')}
						/>
					</div>
				</div>
				<div className="common-controls">
					<PlayerButton
						icon="play"
						onClick={this.play.bind(this)}
					/>
					<PlayerButton
						icon="pause"
						onClick={this.pause.bind(this)}
					/>
					<TrackVolume
						value={controller.common.volume}
						max={100}
						onChange={this.setVolume.bind(this)}
					/>
				</div>
				<div className="controls">
					<button
						onClick={this.openTraksManager.bind(this)}
					>
						Manage tracks
					</button>
					<div className="reset-warning">
						this will reset DJ Controller
					</div>
				</div>
			</div>
		);
	}
}

DJControllerPage.propTypes = {
	tracks: PropTypes.object.isRequired,
	controller: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
};

DJControllerPage.contextTypes = {
	router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
	return {
		tracks: state.tracks,
		controller: state.controller,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Object.assign({}, djControllerPageActions), dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DJControllerPage);