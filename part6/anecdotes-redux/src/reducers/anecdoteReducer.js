import anecdotesService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case "VOTE_ANECDOTE":
      
      const changedAnecdote = action.data;  
      return state.map((anecdote) => 
      (anecdote.id === changedAnecdote.id ? changedAnecdote : anecdote)).sort((a, b) => b.votes - a.votes)
      

      case 'NEW_ANECDOTE':
        return [...state, action.data]

        case 'INIT_ANECDOTES':
          return action.data
    
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    anecdote.votes += 1;
  const changedAnecdotes = await anecdotesService.update(anecdote)
  dispatch({
    type: 'VOTE_ANECDOTE',
    data: changedAnecdotes,
  })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch({
    type: 'NEW_ANECDOTE',
    data: newAnecdote,
    })
  }
}

export default reducer