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

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))