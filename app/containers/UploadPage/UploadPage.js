import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as uploadPageActions from './UploadPageActions';
import './UploadPage.scss';
import TracksLoader from '../../components/TracksLoader/TracksLoader';

class UploadPage extends Component {
	constructor() {
		super();
	}

	openDJController() {
		this.context.router.push('/dj-controller');
	}

	tracksReady() {
		const { left, right } = this.props.tracks;

		return !left.loading && !right.loading &&
			(left.data.length || right.data.length);
	}

	render() {
		const { tracks, actions } = this.props;

		return (
			<div className="upload-page">
				<div className="dropzones">
					<TracksLoader
						title="Left Playlist"
						tracks={tracks.left}
						onLoadStart={actions.loadTracksStart.bind(null, 'left')}
						onLoadEnd={actions.loadTracksEnd.bind(null, 'left')}
						onRemove={actions.removeTrack.bind(null, 'left')}
					/>
					<TracksLoader
						title="Right Playlist"
						tracks={tracks.right}
						onLoadStart={actions.loadTracksStart.bind(null, 'right')}
						onLoadEnd={actions.loadTracksEnd.bind(null, 'right')}
						onRemove={actions.removeTrack.bind(null, 'right')}
					/>
				</div>
				<div className="controls">
					<button
						onClick={this.openDJController.bind(this)}
						disabled={!this.tracksReady()}
					>
						DJ controller
					</button>
				</div>
			</div>
		);
	}
}

UploadPage.propTypes = {
	tracks: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
};

UploadPage.contextTypes = {
	router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
	return {
		tracks: state.tracks,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Object.assign({}, uploadPageActions), dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadPage);