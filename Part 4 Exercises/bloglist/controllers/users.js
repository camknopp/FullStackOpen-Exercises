const usersRouter = require('express').Router()
const bcrypt = require("bcryptjs")
const User = require("../models/user")

usersRouter.get("/", async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body
    
    if (body.password.length < 3) {
        return response.status(400).json({error: "password must be longer than 3 characters"})
    }

    if (body.username.length < 3) {
        return response.status(400).json({error: "username must be longer than 3 characters"})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter