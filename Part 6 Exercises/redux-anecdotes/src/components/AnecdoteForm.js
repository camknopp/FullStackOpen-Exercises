import React from "react"
import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {

	const dispatch = useDispatch()

	const newAnecdote = async event => {
		event.preventDefault()
		let content = event.target.content.value
		const newAnec = await anecdoteService.createNew(content)
		dispatch(addAnecdote(content))
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={newAnecdote}>
				<div>
					<input name="content" />
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
