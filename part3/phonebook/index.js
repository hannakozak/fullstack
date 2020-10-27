require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Person = require('./models/person')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('postbody', function(request) {
  return JSON.stringify(request.body);
});

app.use(
  morgan(
  ':method :url :status :res[content-length] - :response-time ms :postbody'
  )
);

let persons = [
    {
      name: "Arto Hellas",
      number: "211-222-333",
      id: 1
    },
    {
      name: "Ada Lovelace",
      number: "123",
      "id": 2
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4
    }
  ]
  
app.get('/info', (request, response) => {
  response.send(`Phonebook has info for ${persons.length} people <br> ${new Date()}`)
})


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
  response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  console.log('person', request.params)
  Person.findById(request.params.id).then(person => {
    if (person) {
        response.json(person.toJSON())
    } else {
        response.status(404).send({ error: 'Person not found'}).end()
    }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id/', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
    response.status(204).end()
    })
  .catch(error => next(error))
})

const generateId = () => {
   return Math.floor(Math.random() * persons.length) + persons.length
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
        response.json(savedPerson.toJSON())
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT 
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })