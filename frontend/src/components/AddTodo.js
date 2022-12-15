import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const AddTodo = ({ addTodo }) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	const addTodoHandler = e => {
		e.preventDefault()
		addTodo({
			title,
			description,
			status: false,
		})
	}

	return (
		<Form>
			<Form.Group controlId='title'>
			  <Form.Label>Title :</Form.Label>
			  <Form.Control type='text' placeholder='Title' onChange={e => setTitle(e.target.value)} />
			</Form.Group>

			<Form.Group controlId='description'>
			  <Form.Label>Description :</Form.Label>
			  <Form.Control type='text' as="textarea" rows={3} placeholder='Description' onChange={e => setDescription(e.target.value)} />
			</Form.Group>
			<br></br>
			<Button variant='primary' type='submit' onClick={addTodoHandler}>Add Todo</Button>
		</Form>
	)
}

export default AddTodo