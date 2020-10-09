import React from 'react'

const Course = (props) => {
    const { course } = props
    const { parts } = course
    let sum = parts.reduce((a, b) => {
      return a + b.exercises
    }, 0)
  
    return (
      <div>
        <h2>{course.name}</h2>
        {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
        <b>total of {sum} exercises</b>
      </div>
    )
  }
  
  export default Course