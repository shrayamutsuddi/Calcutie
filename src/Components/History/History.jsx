import React from 'react'

const History = ({history, setHistory}) => {
  const deleteHistory = () =>{
    setHistory([])
  }
  const deleteCustomHistory = (indexToDelete) => {
    const updatedHistory = history.filter((element, index) => delFunc(index, indexToDelete))
    setHistory(updatedHistory)
  }
  const delFunc = (index, indexToDelete) => {
    return index !== indexToDelete;
  }
  return (
    <div>
        <h1>Your history</h1>
        {
            history.map((x, index) => (<p key={index}>
                {x.expression} = {x.result}
                <button onClick={() => deleteCustomHistory(index)}>Delete</button>
                </p>)
                )
        }

        <button onClick={deleteHistory}>Delete All History</button>
    </div>
  )
}

export default History