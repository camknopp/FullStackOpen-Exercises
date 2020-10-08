import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { checkPropTypes } from 'prop-types'

const Button = (props) => (
  <div>
    <button onClick={props.onClick}>
      {props.name}
    </button>
  </div>
)

const Statistic = (props) => (
  <tr>
    <td>
      {props.name} 
    </td>
    <td>
      {props.number}
    </td>
  </tr>
)

const DisplayPercent = (props) => (
  <tr>
    <td>
      {props.name} 
    </td>
    <td>
      {(props.number)} %
    </td>
  </tr>
)

const Statistics = ({good, neutral, bad, all, average, positive}) =>
{
  if (good === 0 && neutral === 0 && bad === 0 && all === 0 && average === 0 && positive === 0)
  {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  else {
  return (
    <table>
      <tbody>
        <Statistic name={"good"} number={good} />
        <Statistic name={"neutral"} number={neutral} />
        <Statistic name={"bad"} number={bad} />
        <Statistic name={"all"} number={all} />
        <Statistic name={"average"} number={average.toFixed(1)} />
        <DisplayPercent name={"positive"} number={positive.toFixed(1)} /> 
      </tbody>
    </table>
  )
  }
}

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

      <Button onClick={increaseGood} name="good" />
      <Button onClick={increaseNeutral} name="neutral" />
      <Button onClick={increaseBad} name="bad" />

      <h2>statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} average={average} positive={positive} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)