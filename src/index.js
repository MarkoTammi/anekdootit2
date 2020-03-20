

import React, { useState } from 'react'
import ReactDOM from 'react-dom'



// Component to display all buttons and eventlisteners
const Button = (props) => {
  const { handleClick, text} = props
  return (
      <div>
          <button type="button" className="btn btn-outline-primary btn-sm m-1" onClick={ () => handleClick()}>{text}</button>
      </div>
  )
}

// Component to display the most votes
const MostVotes = (props) => {
    if (props.votes.reduce((partial_sum, a) => partial_sum + a, 0) === 0) {
      return (
        <div>
            No votes given yet.
        </div>
      )
    }
    return (
      <div>
          {/* {props.votes} */}
          <p>{props.anecdotes[props.votes.indexOf(Math.max(...props.votes))]}</p>
          <p>Anecdote number {props.votes.indexOf(Math.max(...props.votes))} has {props.votes[props.votes.indexOf(Math.max(...props.votes))]} votes.</p>
      </div>
    )
}



const App = (props) => {

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(6).fill(0))


    // Handler for "next" button
    const handleNextClick = () => {
      setSelected(randomnumber())
  }


    // Handler for "vote" button
    const handleVoteClick = () => {
        // Update votes[]
        const copy = [...votes]
        copy[selected] += 1 
        setVotes(copy)

        setSelected(randomnumber())
    }

    // Create random number
    const randomnumber = () => {
        let randomnbr
        do {
            randomnbr = Math.round(Math.random() * 10)
        } while (randomnbr === selected || randomnbr > anecdotes.length-1)
        return randomnbr
    }


    return (
        <div>
            <h2>Anecdote of the day</h2>
            {props.anecdotes[selected]}
            <Button 
                handleClick={handleVoteClick} 
                text="vote"/>
            <Button 
                handleClick={handleNextClick} 
                text="next"/>
            <h3 className="mt-5">Anecdote with most votes</h3>
            <MostVotes votes={votes} anecdotes={anecdotes}/>
        </div>
    )
} // End of App()




const anecdotes = [
  'If it hurts, do it more often.',
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
