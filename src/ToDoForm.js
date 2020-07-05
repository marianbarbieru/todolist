import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './ToDoForm.css';

class ToDoForm extends Component {
	constructor(props) {
		super(props);
		this.state = { todo: '' };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(evt) {
		evt.preventDefault();
		const newToDo = { ...this.state, id: uuidv4(), completed: false };
		this.props.createToDo(newToDo);
		this.setState({ todo: '' });
	}

	handleChange(evt) {
		this.setState({ [evt.target.name]: evt.target.value });
	}

	render() {
		return (
			<form className='ToDoForm' onSubmit={this.handleSubmit}>
				<div>
					<label htmlFor='todo'>To Do: </label>
					<input
						placeholder='Type your Todo'
						type='text'
						name='todo'
						id='todo'
						value={this.state.todo}
						onChange={this.handleChange}
						required
					/>
				</div>
				<button>Add ToDo!</button>
			</form>
		);
	}
}

export default ToDoForm;
