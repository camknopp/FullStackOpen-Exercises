import anecdoteService from "../services/anecdotes"

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch({
			type: "INIT_ANECDOTES",
			data: anecdotes
		})
	}
}

const anecdoteReducer = (state = [], action) => {
	console.log("state now: ", state)
	console.log("action", action)

	switch (action.type) {
		case "VOTE": {
			const anecToChange = state.find(anec => anec.id === action.data.id)
			anecToChange.votes += 1
			return state.map(anec =>
				anec.id !== anecToChange.id ? anec : anecToChange
			)
		}
		case "NEW_ANECDOTE": {
			const newAnecdote = {
				content: action.data.content,
				id: action.data.id,
				votes: action.data.votes
			}
			return [...state, newAnecdote]
		}
		case "INIT_ANECDOTES": {
			return action.data
		}
		default:
			return state
	}
}

export const vote = anecdote => {
	return async dispatch => {
		await anecdoteService.vote(anecdote)

		dispatch({ type: "VOTE", data: { id: anecdote.id } })
	}
}

export const addAnecdote = content => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch({
			type: "NEW_ANECDOTE",
			data: newAnecdote
		})
	}
}

export default anecdoteReducer
