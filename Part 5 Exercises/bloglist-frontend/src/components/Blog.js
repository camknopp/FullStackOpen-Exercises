import React, { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5
	}

	const [showAllInfo, setShowAllInfo] = useState(false)
	const [thisBlog, setThisBlog] = useState(blog)

	const likePressed = async blog => {
		const response = await blogService.increaseLikes(blog)

		setThisBlog(response)
	}

	const removePressed = async blog => {
		if (window.confirm(`Are you sure you wish to remove ${blog.title}?`)) {
			const response = await blogService.remove(blog)

			if (response.status === 204) {
				setThisBlog(null)
			} else {
				console.log("unauthorized delete request")
			}
		}
	}

	const showWhenTrue = { display: showAllInfo ? "" : "none" }
	const hideWhenTrue = { display: showAllInfo ? "none" : "" }

	if (thisBlog === null) {
		return <div></div>
	}

	return (
		<div style={blogStyle}>
			<div style={hideWhenTrue}>
				{thisBlog.title}
				<button
					onClick={() => {
						setShowAllInfo(true)
					}}
				>
					view
				</button>
			</div>
			<div style={showWhenTrue}>
				{thisBlog.title}
				<br></br>
				author: {thisBlog.author}
				<button
					onClick={() => {
						setShowAllInfo(false)
					}}
				>
					hide
				</button>
				<br></br>
				url: {thisBlog.url}
				<br></br>
				likes: {thisBlog.likes}
				<button onClick={() => likePressed(thisBlog)}>like</button>
				<br></br>
				<button onClick={() => removePressed(thisBlog)}>remove</button>
			</div>
		</div>
	)
}

export default Blog
