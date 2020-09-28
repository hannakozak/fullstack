import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Mostvotes = ({ votes }) => {
  const max = Math.max.apply(null, Object.values(votes))
  const maxIndex = Object.keys(votes).find(key =>  votes[key] === max)
   return (
     <div>
      { max>0 ?
	    <div> 
	      <h2>Anecdote with most votes </h2>
		  <div>{anecdotes[maxIndex]}</div>
		  <div>has { max } votes</div>
		</div> :
		<div>
		  <h2>Anecdote with most votes </h2>
	      <div>No votes yet</div>
		</div> }
	 </div>
   )
}

const Button = ({ onClick, text }) => (
  <button onClick={ onClick }>
    { text }
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  
  const handleClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  
  const handleVotes = () => {
    const newVotes = { ...votes }
	newVotes[selected]+=1
	setVotes(newVotes) 
  }	
  
  return (
    <div>
	  <h2>Anectode of the day</h2>
        <div>{ anecdotes[selected] }</div>
	    <div>has { votes[selected] } votes</div>
	   <Button onClick={handleVotes} text="vote"/>
	   <Button onClick={handleClick} text="next anecdote"/>
	   <Mostvotes votes={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)