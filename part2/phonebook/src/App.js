import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([{ name: 'Arto Hellas', number: '040-1234567' }]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  
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
		setPersons(persons.concat(personObject))
      setNewName('')
	  setNewNumber('')
	  
  }
  
  const handleNameChange = (event) => {
	  console.log(event.target.value)
	  setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
	  console.log(event.target.value)
	  setNewNumber(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div> name: <input value={newName} onChange={handleNameChange}/></div>
		<div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
	  <ul>
        {persons.map(person => 
		<li key={person.id}>{person.name}  {person.number}</li>
        )}
      </ul>
      ...
    </div>
  )
}

export default App


