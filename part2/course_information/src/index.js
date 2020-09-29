import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({ course }) => {
  return (
    <div>
     <Header  course={ course }/>
	 <Content course={ course } />
	 <Total course={ course } />
    </div>
  )
}

const Header = ({ course }) => {
  return (
    <h2>{ course.name }</h2>
  )
}

const Total = ({ course }) => {
  const total = course.parts.reduce((a,c) => a+c.exercises, 0)
  return(
    <p>Total of { total } exercises</p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      { props.name } { props.exercises }
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
	{ 
	  course.parts.map((part) => 
	    <Part key={ part.id } name={ part.name } exercise={ part.exercise } />
	  )
	}
    </div>
  )
}

const App = () => {
  const courses = [
  {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
	  {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  },
  {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
	  <h1> Web development curriculum</h1>
       {
	      courses.map(course => 
	        <Course key = { course.id } course={ course } />
		  )
	   }
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))