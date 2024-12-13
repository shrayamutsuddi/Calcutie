import React, { useState } from 'react'
import './Calculator.css';
import Display from '../Display/Display';
import History from '../History/History';
const Calculator = () => {
    //let display = "xxx" if i make a variable here then why doesnot it work
    const [data, setData] = useState("")

    const [history, setHistory] = useState([])
    
    const getValue =(event) =>{
        //console.log(event.target.value)
        //display = event.target.value
        setData(data.concat(event.target.value))
    }

    const calculate = () => {
        const result = eval(data).toString()
        setData(result)
        setHistory([...history, {expression: data, result}])
    }

    const backspace = () => {
        setData(data.slice(0,-1))
    }

    const reset = () => {
        setData("0")
    }
  return (
    <div className='container grid grid-cols-3 gap-3'>
        <div>
        <div>
        <Display data={data}></Display>
        </div>
        
        <div className='grid grid-cols-4 gap-3'>
        <button onClick={getValue} value="(">(</button>
        <button onClick={getValue} value=")">)</button>
        <button onClick={getValue} value="%">%</button>
        <button onClick={reset} value="AC">AC</button>
 
        <button onClick={getValue} value="7">7</button>
        <button onClick={getValue} value="8">8</button>
        <button onClick={getValue} value="9">9</button>
        <button onClick={getValue} value="*">*</button>

        <button onClick={getValue} value="4">4</button>
        <button onClick={getValue} value="5">5</button>
        <button onClick={getValue} value="6">6</button>
        <button onClick={getValue} value="-">-</button>

        <button onClick={getValue} value="1">1</button>
        <button onClick={getValue} value="2">2</button>
        <button onClick={getValue} value="3">3</button>
        <button onClick={getValue} value="+">+</button>

        <button onClick={getValue} value="0">0</button>
        <button onClick={getValue} value="/">/</button>
        <button onClick={calculate} value="=">=</button>
        <button onClick={backspace} value="C">Clear</button>
        </div>
        </div>
        

        <div>
            <History history={history} setHistory={setHistory}></History>
        </div>

    </div>
  )
}

export default Calculator