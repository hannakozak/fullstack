import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationMessage } from '../reducers/notificationReducer'
import { removeNotificationMessage } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => {
    if (!state.filter) return state.anecdotes
else
    return state.anecdotes
      .filter((anecdote) =>
        anecdote.content
          .toLowerCase()
          .includes(state.filter.toLowerCase())
      )
  })

  const vote = (id) => {
    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id)
    dispatch(voteAnecdote(votedAnecdote))
    dispatch(
      setNotificationMessage({ message: `You voted ${votedAnecdote.content}` })
    )
    setTimeout(() => {
      dispatch(removeNotificationMessage())
    }, 5000)
  }

  return(
    <div> 
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}</div>
  )
}

export default AnecdoteList