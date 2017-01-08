import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { parallel } from 'async';

import './TracksLoader.scss';
import Spinner from '../Spinner/Spinner';

class TracksLoader extends Component {
	constructor() {
		super();

		this.onDrop = this.onDrop.bind(this);
	}

	onDrop(e) {
		e.preventDefault();

		const { tracks, onLoadStart, onLoadEnd } = this.props;
		const files = e.dataTransfer.files;
		const existingNames = tracks.data.map(track => track.name);
		let newTracks = [];

		onLoadStart();

		for (let file of files) {
			if (file.type === 'audio/mp3' && !_.includes(existingNames, file.name)) {
				newTracks.push(file);
			}
		}

		parallel(newTracks.map(track => {
			return callback => {
				const freader = new FileReader();
				freader.onload = e => {
					callback(null, {
						name: track.name,
						song: new Audio(e.target.result),
					});
				};
				freader.readAsDataURL(track);
			};
		}),
		(err, results) => {
			onLoadEnd(results);
		});
	}

	onDragOver(e) {
		e.preventDefault();
	}

	onDragEnd(e) {
		e.dataTransfer.clearData();
	}

	render() {
		const { title, tracks, onRemove } = this.props;

		return (
			<div
				className="tracks-loader"
				onDrop={this.onDrop}
				onDragOver={this.onDragOver}
				onDragEnd={this.onDragEnd}
			>
				<div className="title">
					{title}
				</div>
				{
					!tracks.data.length ?
					<div className="hint">
						<div>Drag n <span>drop</span> .mp3 files <span>to upload</span> tracks</div>
						<div><span>Click</span> on a track <span>to remove</span> it</div>
					</div>
					: null
				}
				{
					tracks.data.map((track, index) => {
						return (
							<div
								key={index}
								className="track"
								onClick={onRemove.bind(null, index)}
							>
								{`${index + 1}. ${track.name}`}
							</div>
						);
					})
				}
				<Spinner show={tracks.loading} />
			</div>
		);
	}
}

TracksLoader.propTypes = {
	title: PropTypes.string.isRequired,
	tracks: PropTypes.object.isRequired,
	onLoadStart: PropTypes.func.isRequired,
	onLoadEnd: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
};

export default TracksLoader;