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

	// increasing likes works, but does not rerender properly

	const [showAllInfo, setShowAllInfo] = useState(false)
	//const [likePresses, setLikePresses] = useState(0)
	const [thisBlog, setThisBlog] = useState(blog)

	const likePressed = async blog => {
		const response = await blogService.increaseLikes(blog)
	
		setThisBlog(response)
	}

	const showWhenTrue = { display: showAllInfo ? "" : "none" }
	const hideWhenTrue = { display: showAllInfo ? "none" : "" }

	return (
		<div style={blogStyle}>
			<div style={hideWhenTrue}>
				{thisBlog.title} {thisBlog.author}
				<button
					onClick={() => {
						setShowAllInfo(true)
					}}
				>
					view
				</button>
			</div>
			<div style={showWhenTrue}>
				{thisBlog.title} {thisBlog.author}
				<button
					onClick={() => {
						setShowAllInfo(false)
					}}
				>
					hide
				</button>
				<br></br>
				{thisBlog.url}
				<br></br>
				likes {thisBlog.likes}
				<button onClick={() => likePressed(thisBlog)}>like</button>
			</div>
		</div>
	)
}

export default Blog
