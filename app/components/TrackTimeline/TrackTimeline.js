import React, { Component, PropTypes } from 'react';

import './TrackTimeline.scss';
import Slider from '../Slider/Slider';

class TrackTimeline extends Component {
	constructor() {
		super();
	}

	humanizeTime(rawSeconds) {
		const hours = Math.floor(rawSeconds / 3600);
		const minutes = Math.floor((rawSeconds % 3600) / 60);
		const seconds = Math.floor((rawSeconds % 3600) % 60);

		return `${hours}:${this.stringifyTime(minutes)}:${this.stringifyTime(seconds)}`;
	}

	stringifyTime(time) {
		return time < 10 ? `0${time}` : String(time);
	}

	render() {
		const { value, max, onChange, disabled } = this.props;

		return (
			<div className="track-timeline">
				<Slider
					value={value}
					max={max}
					onChange={onChange}
					disabled={disabled}
				/>
				<div className="timers">
					<div>{this.humanizeTime(value)}</div>
					<div>{this.humanizeTime(max)}</div>
				</div>
			</div>
		);
	}
}

TrackTimeline.propTypes = {
	value: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};

export default TrackTimeline;