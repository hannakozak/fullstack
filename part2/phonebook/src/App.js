import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ searchResults, setSearchResults ] = useState([])
  
  useEffect(() => {
  console.log('effect')
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
}, [])
  
  const addPerson = (event) => {
	  event.preventDefault()
	  console.log('button clicked', event.target)
	  const personObject = {
		name: newName,
		number: newNumber,
		date: new Date().toISOString(),
        id: persons.length+1
	  }
	 
persons.some(person => person.name === newName) ? 
		window.alert(`${newName} is already added to phonebook`) :	 
	   axios
    .post('http://localhost:3001/persons', personObject)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
    })
	  
	  
	
  }
  
  const handleNameChange = (event) => {
	  console.log(event.target.value)
	  setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
	  console.log(event.target.value)
	  setNewNumber(event.target.value)
  }
  
  const handleSearch = (event) => {
	  console.log(event.target.value)
	  setSearchTerm(event.target.value)
	  personsFiltered()
  }
  
  const personsFiltered = () => {
	const results = persons.filter(person =>
	person.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
	  <Filter searchTerm={ searchTerm } handleSearch={ handleSearch } searchResults={ searchResults } />
	  
	  <h2>add a new </h2>
	  <PersonForm addPerson={ addPerson } newName={ newName } newNumber={ newNumber } handleNameChange={ handleNameChange } handleNumberChange={ handleNumberChange }/>
      
      <h2>Numbers</h2>
	  <Persons persons={ persons } />
    </div>
  )
}

export default App


