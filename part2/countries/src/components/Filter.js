import React from 'react'

const Filter = ({ searchTerm, handleSearch }) => {
  return (
    <div>
     find countries   <input value={ searchTerm } onChange={ handleSearch }/>	
    </div>
  )
}

export default Filter