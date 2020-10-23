const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { blogs: 0 })
	response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
	const body = request.body

	const decodedToken = jwt.verify(request.token, process.env.SECRET)

	if (!request.token || !decodedToken.id) {
		return response.status(401).json({ error: "token missing or invalid" })
	}

	const user = await User.findById(decodedToken.id)

	let blog = new Blog({
		likes: body.likes,
		title: body.title,
		author: body.author,
		user: user._id,
		url: body.url
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (request, response) => {
	blog = await Blog.findById(request.params.id)
	console.log(blog)

	// get the decoded token from the token header
	const decodedToken = jwt.verify(request.token, process.env.SECRET)

	if (!request.token || !decodedToken.id) {
		return response.status(401).json({ error: "token missing or invalid" })
	}

	// make sure that the authorization token belongs to the blog's creator
	if (decodedToken.id != blog.user[0].toString()) {
		return response
			.status(400)
			.json({ error: "User not authorized to delete this blog entry" })
	}

	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
	entry = request.body

	const blog = {
		author: entry.author,
		title: entry.title,
		url: entry.url,
		likes: entry.likes
	}

	const result = await Blog.findByIdAndUpdate(request.params.id, blog, {
		new: true
	})
	response.status(201).json(result)
})

module.exports = blogsRouter
