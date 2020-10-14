import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ searchResults, setSearchResults ] = useState([])
  
  useEffect(() => {
    personsService
	.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
}, [])
  
  const addPerson = (event) => {
	  event.preventDefault()
	  const personObject = {
		name: newName,
		number: newNumber,
		date: new Date().toISOString(),
        id: persons.length+1
	  }
	 
      persons.some(person => person.name === newName) ? 
		window.alert(`${newName} is already added to phonebook`) :	 
	      personsService
		  .create(personObject)
          .then(returnedPersons => {
            setPersons(persons.concat(returnedPersons))
            setNewName('')
       })
  }
  
  const handleNameChange = (event) => {
	  setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
	  setNewNumber(event.target.value)
  }
  
  const handleSearch = (event) => {
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


