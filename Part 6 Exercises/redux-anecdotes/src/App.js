import React, { useEffect } from "react"
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Notification from "./components/Notification"
import anecdoteService from "./services/anecdotes"

const App = () => {

	// useEffect(() => {
	// anecdoteService.getAll().then(anecs => {
	// 	anecs.forEach(anec => {
	// 		store.dispatch({ type: "NEW_ANECDOTE", data: { content: anec } })
	// 	})
	// })}, [])

	return (
		<div>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
		</div>
	)
}

export default App
