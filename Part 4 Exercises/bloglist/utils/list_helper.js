const _ = require("lodash")
const logger = require("./logger")

const nameCount = (array, name) => {
	let count = 0
	for (let i = 0; i < array.length; i++) {
		if (array[i].author === name) {
			count += 1
		}
	}
	return count
}

const dummy = blogs => {
	return 1
}

const totalLikes = blogs => {
	return blogs.length === 0
		? 0
		: blogs.reduce((sum, item) => {
				return sum + item.likes
		  }, 0)
}

const favoriteBlog = blogs => {
	maxLikes = 0
	favorite = null

	for (let i = 0; i < blogs.length; i++) {
		if (blogs[i].likes > maxLikes) {
			maxLikes = blogs[i].likes
			favorite = blogs[i]
		}
	}
	return favorite
}

const mostBlogs = blogs => {
	let seen = []
	maxBlogs = 0
    returnAuthor = null

	// check number of occurrences of each author
	for (let i = 0; i < blogs.length; i++) {

		if (seen.includes(blogs[i].author) === false) {
			// if the author's name has not been passed already
			occurrences = nameCount(blogs, blogs[i].author) // get number of occurrences of that author's name in the blog list
			if (occurrences > maxBlogs) {
				maxBlogs = occurrences
				returnAuthor = {
					author: blogs[i].author,
					blogs: occurrences
				}
				seen.push(blogs[i].author)
			}
		}
	}
	return returnAuthor
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs
}
