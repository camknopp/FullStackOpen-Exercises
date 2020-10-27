import axios from "axios"
const baseUrl = "/api/blogs"

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = async (blog, token) => {
	const config = {
		headers: {
			Authorization: `bearer ${token}`
		}
	}

	//console.log(config)

	const response = await axios.post(baseUrl, blog, config)
	return response.data
}

const increaseLikes = async blog => {
	// increases the likes of the given blog by 1 using a PUT request

	const idUrl = `${baseUrl}/${blog.id}`
	const newBlog = {
		title: blog.title,
		author: blog.author,
		url: blog.url,
		likes: blog.likes + 1,
		user: blog.user
	}

	const response = await axios.put(idUrl, newBlog)
	return response.data
}

const remove = async blog => {
	const idUrl = `${baseUrl}/${blog.id}`

	const loggedUser = window.localStorage.getItem("loggedInUser")
	const user = JSON.parse(loggedUser)

	// only properly authorized user can delete
	const config = {
		headers: {
			Authorization: `bearer ${user.token}`
		}
	}

	const response = await axios.delete(idUrl, config)
	return response
}

export default { remove, increaseLikes, getAll, create }
