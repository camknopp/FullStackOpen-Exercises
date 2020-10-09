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
      <h2>{course.name}</h2>
      {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
      <b>total of {sum} exercises</b>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    <h1>Web development curriculum</h1>
    {courses.map(course => <p key={course.id}>
      <Course course={course} />
    </p>)}
  </div>
  ) 
}

ReactDOM.render(<App />, document.getElementById('root'))