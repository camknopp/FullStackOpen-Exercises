import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import ErrorMessage from "./components/errorMessage"
import Notification from "./components/notification"

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [user, setUser] = useState(null)
	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")
	const [url, setUrl] = useState("")
	const [notificationMessage, setNotificationMessage] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)

	useEffect(() => {
		blogService.getAll().then(blogs => setBlogs(blogs))
	}, [])

	useEffect(() => {
		const loggedUser = window.localStorage.getItem("loggedInUser")

		if (loggedUser) {
			const user = JSON.parse(loggedUser)

			setUser(user)
		}
	}, [])

	const handleLogin = async event => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username,
				password
			})

      window.localStorage.setItem("loggedInUser", JSON.stringify(user))
      
      setNotificationMessage(`Welcome back ${user.username}`)
			setTimeout(() => {
				setNotificationMessage(null)
			}, 5000)

			//blogService.setToken(user.token)
			setUser(user)
			setUsername("")
			setPassword("")
		} catch {
			// setErrorMessage()
			setErrorMessage("invalid credentials")
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
			setUsername("")
      setPassword("")
    }
    
    

		// console.log("logging in with", username, password)
	}

	const handleLogout = event => {
		// window.localStorage.removeItem("loggedInUser")
		window.localStorage.clear()
		setUser(null)
	}

	const handleCreate = async event => {
		// need to create a new note
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

	if (user === null) {
		return (
			<div>
				<h2>Log in to application</h2>
        <Notification message={notificationMessage} />
			<ErrorMessage message={errorMessage} />
				<form onSubmit={handleLogin}>
					<div>
						username
						<input
							type="text"
							value={username}
							onChange={({ target }) => setUsername(target.value)}
						></input>
					</div>
					<div>
						password
						<input
							type="password"
							value={password}
							onChange={({ target }) => setPassword(target.value)}
						></input>
					</div>
					<button type="submit">login</button>
				</form>
			</div>
		)
	}

	return (
		<div>
			<h2>blogs</h2>
			<Notification message={notificationMessage} />
			<ErrorMessage message={errorMessage} />
			<div>
				{user.name} is logged in
				<button type="submit" onClick={handleLogout}>
					logout
				</button>
			</div>
			<h2>create new</h2>
			<form onSubmit={handleCreate}>
				title:{" "}
				<input
					type="text"
					value={title}
					onChange={({ target }) => setTitle(target.value)}
				></input>
				<br></br>
				author:
				<input
					type="text"
					value={author}
					onChange={({ target }) => setAuthor(target.value)}
				></input>
				<br></br>
				url:
				<input
					type="text"
					value={url}
					onChange={({ target }) => setUrl(target.value)}
				></input>
				<br></br>
				<button type="submit">create</button>
			</form>

			<br></br>
			{blogs.map(blog => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	)
}

export default App
