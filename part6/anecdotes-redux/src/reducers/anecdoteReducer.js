import anecdotesService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case "VOTE_ANECTODE":
      const id = action.id;
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      return state.map((anecdote) => 
      (anecdote.id === id ? changedAnecdote : anecdote)).sort((a, b) => b.votes - a.votes)
      

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

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECTODE',
    id,
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