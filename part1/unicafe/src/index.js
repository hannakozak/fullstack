import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = (good*1 + bad*(-1))/total
  const persentage = (good/total)*100
  
  if (total!==0) {
  return (
    <div>
      <h1>statistics</h1>
	  <div>good {good}</div>
	  <div>neutral {neutral}</div>
	  <div> bad {bad}</div>
      <div> all {total}</div>
      <div> average {average}</div>
      <div> positive {persentage} %</div>
    </div>
  )
  }
  return (
    <div>
      <h1>statistics</h1>
      <div>No feedeback given</div>
      </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
	  <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
	  <button onClick={() => setBad(bad + 1)}>bad</button>
	  <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)