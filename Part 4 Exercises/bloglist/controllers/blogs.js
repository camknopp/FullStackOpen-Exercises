const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user")
	response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
	const body = request.body
	const user = await User.find({})


	let blog = new Blog({
		likes: body.likes,
		title: body.title,
		author: body.author,
		user: user[0]._id,
		url: body.url
	})

	const savedBlog = await blog.save()
	user[0].blogs = user[0].blogs.concat(savedBlog._id)
	await user[0].save()

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
