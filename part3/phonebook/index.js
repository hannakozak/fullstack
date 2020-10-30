/*eslint-env es6*/

require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('postbody', function(request) {
  return JSON.stringify(request.body);
});

app.use(
  morgan(
  ':method :url :status :res[content-length] - :response-time ms :postbody'
  )
);
  
app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(`Phonebook has info for ${persons.length} people <br> ${new Date()}`)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
  .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
    } else {
        response.status(404).send({ error: 'Person not found'}).end()
    }
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, {runValidators: true, context: 'query', new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
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

app.post('/api/persons', (request, response, next) => {
  const body = request.body
    
  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  person.save({runValidators: true}).then(savedPerson => savedPerson.toJSON())
  .then(savedAndFormattedPerson => {
    response.json(savedAndFormattedPerson)
  })
  .catch(function(error) {
	  
  return next(error)
  console.log(error.response.data)
  })

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT 
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })