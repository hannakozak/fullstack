/*eslint-env es6*/

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.mokar.mongodb.net/phonebook?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number
})

if ((name != undefined) && (number != undefined)) {
    person.save().then(result => {
        console.log(`Added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(name + " " + number)
        })
        mongoose.connection.close()
    })
}

