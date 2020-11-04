import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification }  from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)

    const compare = (a, b) => {
		if (a.votes > b.votes) {
			return -1
		} else if (a.votes < b.votes) {
			return 1
		} else {
			return 0
		}
	}

	const castVote = (anecdote) => {
		let msg = `you voted for '${anecdote.content}'`
		dispatch(vote(anecdote.id))
		dispatch(setNotification(msg))
		setTimeout(() => {
			dispatch(removeNotification())
		}, 5000)
	}

	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes.sort(compare).map(anecdote => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => castVote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default AnecdoteList
