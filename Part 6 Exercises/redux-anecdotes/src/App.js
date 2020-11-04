import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { vote, addAnecdote } from "./reducers/anecdoteReducer"

const App = () => {
	const anecdotes = useSelector(state => state)
	const dispatch = useDispatch()

	const newAnecdote = event => {
		event.preventDefault()
		let content = event.target.content.value
		dispatch(addAnecdote(content))
	}

	const compare = (a, b) => {
		if (a.votes > b.votes) {
			return -1
		} else if (a.votes < b.votes) {
			return 1
		} else {
			return 0
		}
	}

	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes.sort(compare).map(anecdote => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
					</div>
				</div>
			))}
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

export default App
