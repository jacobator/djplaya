import React, { Component, PropTypes } from 'react';

import './Slider.scss';

class Slider extends Component {
	constructor() {
		super();
	}

	onChange(e) {
		this.props.onChange(Number(e.target.value));
	}

	render() {
		const { value, max, disabled } = this.props;

		return (
			<input
				className="slider"
				type="range"
				value={value}
				max={max}
				onChange={this.onChange.bind(this)}
				disabled={disabled}
			/>
		);
	}
}

Slider.propTypes = {
	value: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};

export default Slider;