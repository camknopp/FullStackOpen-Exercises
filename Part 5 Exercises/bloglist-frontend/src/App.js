import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import ErrorMessage from "./components/errorMessage"
import Notification from "./components/notification"
import CreateForm from "./components/createForm"

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [user, setUser] = useState(null)
	const [notificationMessage, setNotificationMessage] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)
	const [showBlogForm, setShowBlogForm] = useState(false)

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

			setUser(user)
			setUsername("")
			setPassword("")
		} catch {
			setErrorMessage("invalid credentials")
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
			setUsername("")
			setPassword("")
		}
	}

	const handleLogout = event => {
		window.localStorage.clear()
		setUser(null)
	}

	const showWhenFormVisible = { display: showBlogForm ? "" : "none" }
	const hideWhenFormVisible = { display: showBlogForm ? "none" : "" }

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

			<div style={showWhenFormVisible}>
				<CreateForm
					setErrorMessage={setErrorMessage}
          setNotificationMessage={setNotificationMessage}
          setBlogs={setBlogs}
				/>
				<button
					onClick={() => {
						setShowBlogForm(!showBlogForm)
					}}
				>
					cancel
				</button>
			</div>

			<div style={hideWhenFormVisible}>
				<button
					onClick={() => {
						setShowBlogForm(!showBlogForm)
					}}
				>
					add new blog
				</button>
			</div>

			<br></br>
			{blogs.map(blog => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	)
}

export default App
