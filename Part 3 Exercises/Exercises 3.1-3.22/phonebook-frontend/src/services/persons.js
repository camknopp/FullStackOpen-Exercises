//import React from 'react'
import axios from "axios"

const baseurl = "/api/entries"

const getAll = () => {
    // return all of the phonebook entries
  return axios.get(baseurl)
}

const create = personObject => {
    // create new entry in phonebook
  return axios.post(baseurl, personObject)
}

const update = (newObject, id) => {
    // update already existing entry at given ID with new object
  return axios.put(`${baseurl}/${id}`, newObject)
}

const remove = id => {
  return axios.delete(`${baseurl}/${id}`)
}

export default { getAll, create, update, remove }
