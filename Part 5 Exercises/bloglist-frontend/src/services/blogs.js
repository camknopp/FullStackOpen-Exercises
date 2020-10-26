import axios from "axios"
const baseUrl = "/api/blogs"

// let token = null

// const setToken = (userToken) => {
//   token = `bearer ${userToken}`
// }

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = async (blog, token)=> {
	const config = {
		headers: {
			Authorization: `bearer ${token}`
		}
	}

	console.log(config)

	const response = await axios.post(baseUrl, blog, config)
	return response.data
}

const increaseLikes = async (blog) => {
	const idUrl = `${baseUrl}/${blog.id}`	
	const newBlog = {
		title: blog.title,
		author: blog.author,
		url: blog.url,
		likes: blog.likes + 1,
		user: blog.user
	}

	await axios.put(idUrl, newBlog)

}

export default { increaseLikes, getAll, create }
