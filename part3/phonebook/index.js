const express = require('express')
const app = express()

app.use(express.json())

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
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const max = persons.length 
   return Math.floor(Math.random() * Math.floor(max) + 1)
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }
  
  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }
  
  if (persons.find(person => person.name === body.name)){
	return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)