import React, { Component } from 'react';
import ToDo from './ToDo';
import ToDoForm from './ToDoForm';
import { v4 as uuidv4 } from 'uuid';
import './ToDoList.css';

class ToDoList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [],
		};

		this.create = this.create.bind(this);
		this.remove = this.remove.bind(this);
		this.update = this.update.bind(this);
	}

	hydrateStateWithLocalStorage() {
		let arr = [];
		for (let key in localStorage) {
			let lstodo = localStorage.getItem(key);
			arr.push({ todo: lstodo, id: key });
		}
		arr = arr.filter((todo) => {
			return todo.todo !== null;
		});
		this.setState({
			todos: [...this.state.todos, ...arr],
		});
	}
	componentDidMount() {
		this.hydrateStateWithLocalStorage();
	}

	remove(id) {
		this.setState({ todos: this.state.todos.filter((todo) => todo.id !== id) });
		localStorage.removeItem(id);
	}

	create(todo) {
		this.setState({ todos: [...this.state.todos, todo] });
		localStorage.setItem(todo.id, todo.todo);
	}

	update(id, updatedTodo) {
		const updatedTodos = this.state.todos.map((todo) => {
			if (todo.id === id) {
				localStorage.setItem(todo.id, updatedTodo);
				return { ...todo, todo: updatedTodo };
			}
			return todo;
		});
		this.setState({ todos: updatedTodos });
	}

	render() {
		const todos = this.state.todos.map((obj) => {
			return (
				<ToDo
					key={obj.id}
					id={obj.id}
					todo={obj.todo}
					remove={this.remove}
					updateToDo={this.update}
				/>
			);
		});
		return (
			<div className='ToDoList'>
				<h1 className='ToDoList-title'>To Do List!</h1>
				<p className='ToDoList-desc'>Make a list to be more organized!</p>
				<ul>{todos}</ul>

				<ToDoForm createToDo={this.create} key={uuidv4()} />
			</div>
		);
	}
}

export default ToDoList;
