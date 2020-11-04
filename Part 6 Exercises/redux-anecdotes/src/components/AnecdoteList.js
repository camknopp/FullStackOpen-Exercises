import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

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
		</div>
	)
}

export default AnecdoteList
