import axios from 'axios'

const baseurl = "http://localhost:3001/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    const response = await axios.get(baseurl)
    return response.data
}

const createNew = async (content) => {
    const newAnec = {
        content: content,
        id: getId(),
        votes: 0
    }

    const response = await axios.post(baseurl, newAnec)
    return response.data
}

export default { getAll, createNew }