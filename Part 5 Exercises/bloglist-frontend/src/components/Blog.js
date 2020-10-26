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
  const [likePresses, setLikePresses] = useState(0)

  const likePressed = (blog) => {
    blogService.increaseLikes(blog)
    setLikePresses(likePresses+1)
  }

	const showWhenTrue = { display: showAllInfo ? "" : "none" }
	const hideWhenTrue = { display: showAllInfo ? "none" : "" }

	return (
		<div style={blogStyle}>
			<div style={hideWhenTrue}>
				{blog.title} {blog.author}
				<button
					onClick={() => {
						setShowAllInfo(true)
					}}
				>
					view
				</button>
			</div>
			<div style={showWhenTrue}>
				{blog.title} {blog.author}
				<button
					onClick={() => {
						setShowAllInfo(false)
					}}
				>
					hide
				</button>
				<br></br>
				{blog.url}
				<br></br>
				likes {blog.likes}
				<button onClick={() => likePressed(blog)}>like</button>
			</div>
		</div>
	)
}

export default Blog
