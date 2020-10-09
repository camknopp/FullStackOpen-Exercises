import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  let p = props.parts
  return (
    <div>
      <Part part={p[0].name} exercises={p[0].exercises} />
      <Part part={p[1].name} exercises={p[1].exercises} />
      <Part part={p[2].name} exercises={p[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  let p = props.parts
  let tot = p[0].exercises + p[1].exercises + p[2].exercises
  return (
    <div>
      <p>Number of exercises {tot}</p>
    </div>
  )
}

const Course = (props) => {
  const { course } = props
  const { parts } = course
  return (
    <div>
      <h1>{course.name}</h1>
      {parts.map(part => <p key={part.id}>
      {part.name} {part.exercises}</p>)}
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