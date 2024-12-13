import React from 'react'

const History = ({history, setHistory}) => {
  return (
    <div>
        <h1>Your history</h1>
        {
            history.map((x, index) => (<p key={index}>
                {x.expression} = {x.result}
                </p>))
        }

        <button>Delete History</button>
    </div>
  )
}

export default History