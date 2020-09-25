import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({ text, value }) => (
	<div>
	{text} {value}
	</div>
)

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good*1 + bad*(-1))/total
  const persentage = (good/total)*100
  
  if (total!==0) {
  return (
    <div>
      <h1>statistics</h1>
	  <Statistic text="good" value ={good} />
      <Statistic text="neutral" value ={neutral} />
      <Statistic text="bad" value ={bad} />
	  <Statistic text="all" value ={total} />
	  <Statistic text="average" value ={average} />
	  <Statistic text="positive" value ={persentage} />
	  
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
  
  const handleSetGood = () => {
    setGood(good + 1)
  }

    const handleSetNeutral = () => {
    setNeutral(neutral + 1)
  }

    const handleSetBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleSetGood} text="good" />
	  <Button onClick={handleSetNeutral} text="neutral" />
	  <Button onClick={handleSetBad} text="bad" />
	  <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)