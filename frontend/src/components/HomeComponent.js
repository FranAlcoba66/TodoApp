import { Container, Row, Col, Card } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AddTodo from './AddTodo'
import Todo from './Todo'

const HomeComponent = () => {

    const [todos, setTodos] = useState([])

	const getTodos = async () => {
		try {
			const response = await axios.get('/todo/v1/todo/')
			const { data } = response
			setTodos(data)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		getTodos()
	}, [])

	const addTodo = async newTodo => {
		try {
			console.log(newTodo)
			await axios.post('/todo/v1/todo/', newTodo)
			getTodos()
		} catch (err) {
			console.log(err)
		}
	}

	const completeTodo = async id => {
		try {
			const todo = todos.filter(todo => todo.id === id)[0]
			todo.completed = true
			await axios.put(`/todo/v1/todo/${id}/`, todo)
			getTodos()
		} catch(err) {
			console.log(err)
		}
	}

	const editTodo = async todo => {
		try {
			await axios.put(`/todo/v1/todo/${todo.id}/`, todo)
			getTodos()
		} catch(err) {
			console.log(err)
		}
	}

	const deleteTodo = async id => {
		try {
			await axios.delete(`/todo/v1/todo/${id}/`)
			getTodos()
		} catch(err) {
			console.log(err)
		}
	}

	return (
		<div className='wrapper'>
		<Container>
		  <Row className='justify-content-center pt-5'>
		    <Col>
		      <Card className='p-5'>
					  <h3>My Todos</h3>
					  <AddTodo addTodo={addTodo} />
					  {todos.map((todo, index) => (
					  	!todo.completed && <Todo key={index} id={todo.id} title={todo.title} description={todo.description} completeTodo={completeTodo} editTodo={editTodo} deleteTodo={deleteTodo} />
					  ))}
					</Card>
				</Col>
			</Row>
		</Container>
		</div>
	);


}

export default HomeComponent



