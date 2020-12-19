import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationMessage } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (id) => {
    const anecdote = props.anecdotes.find((anecdote) => anecdote.id === id)
    props.voteAnecdote(anecdote)
    props.setNotificationMessage(`you voted ${anecdote.content}`, 3)
  }

  return(
    <div> 
    {props.anecdotes.map(anecdote =>
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

const mapDispatchToProps = {
  voteAnecdote,
  setNotificationMessage,
}

const mapStateToProps = (state) => {
  if (state.filter === "ALL") {
    return {
       anecdotes: state.anecdotes
     }
    }
  else
    return {
      anecdotes: state.anecdotes
      .filter((anecdote) =>
        anecdote.content
          .toLowerCase()
          .includes(state.filter.toLowerCase())
      )
    }
  }

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList