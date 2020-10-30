import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={good}>Good</button> 
      <br></br>
      <button onClick={ok}>Neutral</button> 
      <br></br>
      <button onClick={bad}>Bad</button>
      <br></br>
      <button onClick={zero}>Reset Stats</button>
      <br></br>
      <br></br>
      <div>Good: {store.getState().good}</div>
      <div>Neutral: {store.getState().ok}</div>
      <div>Bad: {store.getState().bad}</div>
      <div>All: {store.getState().all}</div>
      <div>Average: {store.getState().average}</div>
      <div>Percent Positive: {store.getState().positive * 100}%</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
