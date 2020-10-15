require("dotenv").config()
const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const url = process.env.MONGODB_URI

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
	.then(result => {
		console.log("connected to MongoDB")
	})
	.catch(error => {
		console.log("error connecting to MongoDB: ", error.message)
	})

const entrySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true, 
		minlength: 3
	},
	number: {
		type: Number,
		required: true,
		minlength: 8,
		unique: false
	}
})

entrySchema.plugin(uniqueValidator)

entrySchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model("Entry", entrySchema)
