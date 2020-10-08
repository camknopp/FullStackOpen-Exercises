import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const DisplayItem = (props) => (
  <div>
    {props.name} {props.number}
  </div>
)



const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good+1)}>
        good
      </button>

      <button onClick={() => setNeutral(neutral+1)}>
        neutral
      </button>

      <button onClick={() => setBad(bad+1)}>
        bad
      </button>

      <h2>statistics</h2>
      <DisplayItem name={"good"} number={good} />
      <DisplayItem name={"neutral"} number={neutral} />
      <DisplayItem name={"bad"} number={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)