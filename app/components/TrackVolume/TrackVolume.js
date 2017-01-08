import React, { Component, PropTypes } from 'react';

import './TrackVolume.scss';
import Slider from '../Slider/Slider';

class TrackVolume extends Component {
	constructor() {
		super();
	}

	humanizeVolume(volume) {
		return `Volume: ${volume}%`;
	}

	render() {
		const { value, max, onChange, disabled } = this.props;

		return (
			<div className="track-volume">
				<Slider
					value={value}
					max={max}
					onChange={onChange}
					disabled={disabled}
				/>
				<div className="value">
					{this.humanizeVolume(value)}
				</div>
			</div>
		);
	}
}

TrackVolume.propTypes = {
	value: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};

export default TrackVolume;