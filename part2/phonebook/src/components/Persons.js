import React from 'react'

const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      <ul>
        {persons.map(person => 
		<li key={ person.name }>{ person.name }  { person.number } <button onClick={() => handleDelete(person.id, person.name)}>delete</button></li>
        )}
      </ul>
    </div>
  )
}

export default Persons