import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const App = (props) => {
  let a = new Array(6).fill(0)
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(a)
  const [mostVotesIndex, setMostVotes] = useState(0)

  const getAnecdote = () => {
    let r = Math.floor(Math.random()*props.anecdotes.length)
    setSelected(r)
  }

  const incrementVote = () => {
    const copy = [...vote]
    copy[selected]+=1
    setVote(copy)
    findMaxIndex()
  }

  const findMaxIndex = () => {
    let max = 0
    let maxIndex = 0
    let v = vote
    
    for (let i = 0; i < v.length; i++)
    {
      if (v[i] > max)
      {
        max = v[i]
        maxIndex = i
      }
    }
    setMostVotes(maxIndex)
  }

  return (
    <div>
      <h2>
        Anecdote of the day
      </h2>
      <p>
        {props.anecdotes[selected]}
      </p>
      <p>
        has {vote[selected]} votes
      </p>

      <button onClick={incrementVote}>
        vote
      </button>
      <button onClick={getAnecdote}>
        next anecdote
      </button>

      <h2>Anecdote with most votes</h2>
      <p>
        {props.anecdotes[mostVotesIndex]}
      </p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)