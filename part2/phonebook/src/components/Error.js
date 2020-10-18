import React from 'react'

const Error = ({ error }) => {
  if (error === null) {
    return null
  }
  return (
    <div className="error">
      {error}
    </div>
  )
}

export default Error