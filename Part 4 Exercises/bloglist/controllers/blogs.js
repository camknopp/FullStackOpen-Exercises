const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

const getTokenFrom = request => {
	const authorization = request.get("authorization")
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		return authorization.substring(7)
	}
	return null
}

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { blogs: 0 })
	response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
	const body = request.body

	const token = getTokenFrom(request)
	const decodedToken = jwt.verify(token, process.env.SECRET)

	if (!token || !decodedToken.id) {
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
