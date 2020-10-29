import React, { useState } from "react"
import blogService from "../services/blogs"

const CreateForm = ({ setNotificationMessage, setErrorMessage, setBlogs }) => {
	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")
	const [url, setUrl] = useState("")

	const handleCreate = async event => {
		event.preventDefault()
		const loggedUser = window.localStorage.getItem("loggedInUser")
		const user = JSON.parse(loggedUser)
		const token = user.token

		const newBlog = {
			title,
			author,
			url
		}

		try {
			await blogService.create(newBlog, token)
            setNotificationMessage(`added new blog, ${newBlog.title}`)
            blogService.getAll().then(blogs => setBlogs(blogs))
		} catch {
			setErrorMessage("error creating new blog")
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
		setTitle("")
		setAuthor("")
		setUrl("")
	}

	return (
		<form onSubmit={handleCreate}>
			title:{" "}
			<input
				id="title"
				type="text"
				value={title}
				onChange={({ target }) => setTitle(target.value)}
			></input>
			<br></br>
			author:
			<input
				id="author"
				type="text"
				value={author}
				onChange={({ target }) => setAuthor(target.value)}
			></input>
			<br></br>
			url:
			<input
				id="url"
				type="text"
				value={url}
				onChange={({ target }) => setUrl(target.value)}
			></input>
			<br></br>
			<button id="submit" type="submit">create</button>
		</form>
	)
}

export default CreateForm
