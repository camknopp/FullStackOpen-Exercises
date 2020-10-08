import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const DisplayItem = (props) => (
  <div>
    {props.name} {props.number}
  </div>
)

const DisplayPercent = (props) => (
  <div>
    {props.name} {(props.number)} %
  </div>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const increaseGood = () => {
    setGood(good+1)
    setAll(all+1)
    let pos = ((good+1) / (all+1))*100
    let ave = ((good+1) + (bad*-1)) / (all+1)
    setPositive(pos)
    setAverage(ave)
  }

  const increaseBad = () => {
    setBad(bad+1)
    setAll(all+1)
    let pos = (good / (all+1))*100
    let ave = (good + ((bad+1)*-1)) / (all+1)
    setPositive(pos)
    setAverage(ave)
  }

  const increaseNeutral = () => {
    setNeutral(neutral+1)
    setAll(all+1)
    let pos = (good / (all+1))*100
    let ave = (good + (bad*-1)) / (all+1)
    setPositive(pos)
    setAverage(ave)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => increaseGood()}>
        good
      </button>

      <button onClick={() => increaseNeutral()}>
        neutral
      </button>

      <button onClick={() => increaseBad()}>
        bad
      </button>

      <h2>statistics</h2>
      <DisplayItem name={"good"} number={good} />
      <DisplayItem name={"neutral"} number={neutral} />
      <DisplayItem name={"bad"} number={bad} />
      <DisplayItem name={"all"} number={all} />
      <DisplayItem name={"average"} number={average} />
      <DisplayPercent name={"positive"} number={positive} />

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)