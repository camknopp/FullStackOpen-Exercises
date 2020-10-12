//import React from 'react'
import axios from 'axios'

const baseurl = 'http://localhost:3001/persons'


const getAll = () => {
    return axios.get(baseurl)
}

const create = (personObject) => {
    return axios.post(baseurl, personObject)
}

const update = (newObject, id) => {
    return axios.put(`${baseurl}/${id}`, newObject)
}

const remove = (id) => {
    return axios.delete(`${baseurl}/${id}`)
}

export default { getAll, create, update, remove }