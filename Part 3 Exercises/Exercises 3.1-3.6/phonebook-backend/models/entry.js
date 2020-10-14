require("dotenv").config()
const mongoose = require("mongoose")

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
		console.log('error connecting to MongoDB: ', error.message)
	})

const entrySchema = new mongoose.Schema({
	name: String,
	number: Number
})

module.exports = mongoose.model("Entry", entrySchema)
