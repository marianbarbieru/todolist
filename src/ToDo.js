import React, { Component } from 'react';
import './Todo.css';

class ToDo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todo: this.props.todo,
			isEditing: false,
			completed: false,
		};
		this.removeTodo = this.removeTodo.bind(this);
		this.handleEditing = this.handleEditing.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.erase = this.erase.bind(this);
	}

	handleChange(evt) {
		this.setState({ [evt.target.name]: evt.target.value });
	}

	handleUpdate(evt) {
		evt.preventDefault();
		this.props.updateToDo(this.props.id, this.state.todo);
		this.setState({ isEditing: false });
	}

	removeTodo() {
		this.props.remove(this.props.id);
	}
	handleEditing() {
		this.setState({ isEditing: !this.state.isEditing });
	}

	erase() {
		this.setState({ completed: !this.state.completed });
	}

	render() {
		let result;
		if (this.state.isEditing) {
			result = (
				<div className='ToDo'>
					<form className='ToDo-form' onSubmit={this.handleUpdate}>
						<input
							type='text'
							value={this.state.todo}
							name='todo'
							onChange={this.handleChange}
						/>
						<button>Save</button>
					</form>
				</div>
			);
		} else {
			result = (
				<div className='ToDo'>
					<li
						className={this.state.completed ? 'completed' : ''}
						onClick={this.erase}
					>
						{this.props.todo}
					</li>
					<div>
						<i className='fas fa-edit' onClick={this.handleEditing}></i>
						<i className='fas fa-trash-alt' onClick={this.removeTodo}></i>
					</div>
				</div>
			);
		}
		return result;
	}
}

export default ToDo;
