import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ searchResults, setSearchResults ] = useState([])
  const [ addMessage, setAddMessage ] = useState(null)
  const [ error, setError ] = useState(null)
  
  useEffect(() => {
    personsService
	.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
}, [])
  
  const addPerson = (event, id) => {
	  event.preventDefault()
	  const personObject = {
		name: newName,
		number: newNumber,
	  }
	 
     if ( persons.some(person => person.name === newName) ){
		window.alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
		  const personToChange = persons.find(person => person.name === newName)
		  const changedPerson = {...personToChange, number: newNumber}
          personsService
		   .update(changedPerson.id, changedPerson)
		    .then(returnedPersons => {
              setPersons(persons.map(person => 
                person.id !== changedPerson.id
                ? person
		        : returnedPersons))})
				.catch(error => {
              setError('error')
			  setAddMessage(null)
              setError(
                `Information of ${newName} has already been removed from server.`
                )
              
              setTimeout(() => {
                setError(null)
              }, 5000)
            })
			setAddMessage(`${newName}s number was sucessfully changed`)
			setTimeout(() => {
            setAddMessage(null)
          }, 5000)
            setNewName('')
			setNewNumber('')
			
	}
	 
      else 	  
	      personsService
		  .create(personObject)
          .then(returnedPersons => {
            setPersons(persons.concat(returnedPersons))
			setAddMessage(`${newName} was sucessfully added`)
			setTimeout(() => {
            setAddMessage(null)
          }, 5000)
            setNewName('')
			setNewNumber('')
       }).catch(err => {
          setError(err.response.data.error)
		  setTimeout(() => {
            setError(null)
          }, 5000)
        });
	   
	  
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
  
  const handleDelete = (id, name) => {
	if(window.confirm(`Delete ${name}?`)){
	  personsService
	  .remove(id)
	  .then(() =>  {
      setPersons(persons.filter(n => n.id !== id) )}
	  )
	}
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
	  <Notification message={addMessage} />
	  <Error error={error} />
	  <Filter searchTerm={ searchTerm } handleSearch={ handleSearch } searchResults={ searchResults } />
	  
	  <h2>add a new </h2>
	  <PersonForm addPerson={ addPerson } newName={ newName } newNumber={ newNumber } handleNameChange={ handleNameChange } handleNumberChange={ handleNumberChange }/>
      
      <h2>Numbers</h2>
	  <Persons persons={ persons } handleDelete={ handleDelete } />
    </div>
  )
}

export default App


