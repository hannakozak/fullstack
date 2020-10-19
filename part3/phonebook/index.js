const express = require('express')
const app = express()

let persons = [
    {
      "name": "Arto Hellas",
      "number": "211-222-333",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "123",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
  ]
  
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)