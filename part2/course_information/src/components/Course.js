import React from 'react'

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

export default Course;
