import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [user, setUser] = useState(null)

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

			setUser(user)
			setUsername("")
			setPassword("")
		} catch {
			// setErrorMessage()
			console.log("error: wrong credentials")
		}
		// console.log("logging in with", username, password)
	}

	const handleLogout = event => {
    window.localStorage.removeItem("loggedInUser")
    setUser(null)
	}

	if (user === null) {
		return (
			<div>
				<h2>Log in to application</h2>
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
			<div>
				{user.name} is logged in 
				<button type="submit" onClick={handleLogout}>
					logout
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
