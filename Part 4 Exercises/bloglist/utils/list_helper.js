const dummy = blogs => {
	return 1
}

const totalLikes = blogs => {
	return blogs.length === 0 ? 0 : blogs.reduce((sum, item) => {
		return sum + item.likes
	}, 0)
}

const favoriteBlog = blogs =>{
    maxLikes = 0
    favorite = null

    for(let i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > maxLikes) {
            maxLikes = blogs[i].likes
            favorite = blogs[i]
        }
    }
    return favorite
}

module.exports = {
	dummy,
    totalLikes,
    favoriteBlog
}
