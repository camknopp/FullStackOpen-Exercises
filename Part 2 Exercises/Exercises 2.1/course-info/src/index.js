import React from 'react'
import ReactDOM from 'react-dom'

const Course = (props) => {
  const { course } = props
  const { parts } = course
  let sum = parts.reduce((a, b) => {
    return a + b.exercises
  }, 0)

  return (
    <div>
      <h1>{course.name}</h1>
      {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
      <b>total of {sum} exercises</b>
    </div>
  )
}

const App = () => {
  const course = {
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
      }
    ]
  }


  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))