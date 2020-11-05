import { composeWithDevTools } from "redux-devtools-extension"
import anecdoteReducer from "./reducers/anecdoteReducer"
import notificationReducer from "./reducers/notificationReducer"
import filterReducer from "./reducers/filterReducer"
import { createStore, combineReducers } from "redux"
import anecdoteService from "./services/anecdotes"
import thunk from "redux-thunk"

const reducer = combineReducers({
	anecdotes: anecdoteReducer,
	notification: notificationReducer,
	filter: filterReducer
})

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
))

anecdoteService.getAll().then(anecs => {
	anecs.forEach(anec => {
		store.dispatch({ type: "NEW_ANECDOTE", data: anec })
	})
})

export default store
