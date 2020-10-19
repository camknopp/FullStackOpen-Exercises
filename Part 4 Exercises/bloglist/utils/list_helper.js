const _ = require("lodash")
const logger = require("./logger")

const nameCount = (array, name) => {
    let count = 0
    for(var x in array) {
        if (x.author === name) {
            count += 1
        }
    }

    logger.info(`Returning a count of ${count} for ${name}`)
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
        logger.info(`in loop for ${blogs[i].author}`)
        
        if (!seen.includes(blogs[i].author)) {  // if the author's name has not been passed already
            occurrences = nameCount(blogs, blogs[i].author)  // get number of occurrences of that author's name in the blog list
            if (occurrences > maxBlogs) {
                logger.info(`${blogs[i].author} occurs ${occurrences} times, the max so far`)
                maxBlogs = occurrences 
                returnAuthor = {
                    "name": blogs[i].name,
                    "blogs": occurrences
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
