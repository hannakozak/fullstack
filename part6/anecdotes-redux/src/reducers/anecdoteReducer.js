
const getId = () => (100000 * Math.random()).toFixed(0)





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

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECTODE',
    id,
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export default reducer