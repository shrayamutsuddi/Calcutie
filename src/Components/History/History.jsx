import React from 'react'

const History = ({history, setHistory}) => {
  const deleteHistory = () =>{
    setHistory([])
  }
  return (
    <div>
        <h1>Your history</h1>
        {
            history.map((x, index) => (<p key={index}>
                {x.expression} = {x.result}
                </p>))
        }

        <button onClick={deleteHistory}>Delete History</button>
    </div>
  )
}

export default History