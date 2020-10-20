const mongoose = require("mongoose")
const supertest = require("supertest")
const logger = require("../utils/logger")
const app = require("../App")
const api = supertest(app)
const Blog = require("../models/blog")

const initialBlogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url:
			"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url:
			"http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
		__v: 0
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url:
			"http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
		__v: 0
	}
]

describe("blogs api tests", () => {
	beforeEach(async () => {
		await Blog.deleteMany({})

		for (var blog of initialBlogs) {
			let blogObject = new Blog(blog)
			await blogObject.save()
		}
	})

	test("returns correct amount of blog posts in JSON format", async () => {
		const response = await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/)

		expect(response.body).toHaveLength(6)
	})

	test("id property has name 'id' rather than '_id'", async () => {
		const response = await api.get("/api/blogs")

		expect(response.body[1].id).toBeDefined()
		expect(response.body[1]._id).toBe(undefined)
	})

	test("POST creates new blog post", async () => {
		const blogEntry = {
			author: "Tim Timerson",
			title: "The cool blog",
			likes: 5000
		}

		let blogObject = new Blog(blogEntry)
		await blogObject.save()

		response = await api.get("/api/blogs")
		expect(response.body).toHaveLength(7)
	})

	test("likes property defaults to 0", async () => {
		const blogEntry = {
			author: "Tim Timerson",
			title: "The cool blog",
		}

		let blogObject = new Blog(blogEntry)
		await blogObject.save()

		response = await api.get('/api/blogs')
		expect(response.body[6].likes).toBe(0)
	})

	afterAll(() => {
		mongoose.connection.close()
	})
})
