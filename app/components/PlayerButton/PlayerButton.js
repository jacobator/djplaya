import React, { Component, PropTypes } from 'react';

import './PlayerButton.scss';

class PlayerButton extends Component {
	constructor() {
		super();
	}

	getClassName(active) {
		return `player-button${active ? ' active' : ''}`;
	}

	render() {
		const { icon, active, onClick, disabled } = this.props;

		return (
			<button
				className={this.getClassName(active)}
				onClick={onClick}
				disabled={disabled}
			>
				<i className={`fa fa-${icon}`} />
			</button>
		);
	}
}

PlayerButton.propTypes = {
	icon: PropTypes.string.isRequired,
	active: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};

export default PlayerButton;