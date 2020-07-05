import React, { Component } from 'react';
import './footer.css';

class Footer extends Component {
	constructor(props) {
		super(props);
		let year = new Date().getFullYear();

		this.state = {
			year: year,
		};
	}

	render() {
		return (
			<footer className='Footer'>
				<h6>Made by Marian Barbieru &copy; {this.state.year}</h6>
			</footer>
		);
	}
}

export default Footer;
