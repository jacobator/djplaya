import React, { Component, PropTypes } from 'react';

import './Spinner.scss';

class Spinner extends Component {
	constructor() {
		super();
	}

	render() {
		const { show } = this.props;

		return (
			show ?
			<div className="spinner-wrapper">
				<div className="spinner">
					<div className="rect1" />
					<div className="rect2" />
					<div className="rect3" />
					<div className="rect4" />
					<div className="rect5" />
				</div>
			</div>
			: null
		);
	}
}

Spinner.propTypes = {
	show: PropTypes.bool.isRequired,
};

export default Spinner;