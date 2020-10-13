import 'index.js'

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://camlk10:${password}@cluster0.khj58.mongodb.net/entries?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const entrySchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Entry = mongoose.model('Entry', entrySchema)

const entry = new Entry({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
})

note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })