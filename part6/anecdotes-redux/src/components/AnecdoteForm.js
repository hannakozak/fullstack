import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationMessage } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()
  
  const addAnecdote = async(event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotificationMessage(`Successfully added anecdote`, 5))
  }
  return (
      <div>
        <h2>create new</h2>
          <form onSubmit={addAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
           </form>
      </div>
  )
}

export default AnecdoteForm
