import React, { useState } from 'react'
import './Calculator.css';
import Display from '../Display/Display';
import History from '../History/History';
import { renderToPipeableStream } from 'react-dom/server';
const Calculator = () => {
    //let display = "xxx" if i make a variable here then why doesnot it work
    const [data, setData] = useState("")

    const [history, setHistory] = useState([])
    
    const getValue =(event) =>{
        //console.log(event.target.value)
        //display = event.target.value
        setData(data.concat(event.target.value))
    }

    const backspace = () => {
        setData(data.slice(0,-1))
    }

    const reset = () => {
        setData("")
    }

    const calculate = () => {
      // Function to determine operator precedence
      const getPrecedence = (ch) => {
          if (ch === '^') return 3;
          else if (ch === '*' || ch === '/') return 2;
          else if (ch === '+' || ch === '-') return 1;
          return -1;
      };
  
      // Function to convert an infix expression to a postfix expression
      const infixToPostfix = (data) => {
          console.log("Infix expression: " + data);
          const result = [];
          const stack = [];
  
          for (let i = 0; i < data.length; i++) {
              const ch = data[i];
  
              // Handle numbers (including multi-digit and decimals)
              if (!isNaN(ch) || ch === '.') {
                  let number = '';
                  while (i < data.length && (!isNaN(data[i]) || data[i] === '.')) {
                      number += data[i];
                      i++;
                  }
                  i--; // Adjust index after inner loop
                  result.push(number); // Push the full number to result
              } 
              else if (ch === '(') {
                  stack.push(ch); // Push '(' to stack
              } 
              else if (ch === ')') {
                  // Pop operators until '(' is found
                  while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                      result.push(stack.pop());
                  }
                  stack.pop(); // Remove the '('
              } 
              else {
                  // Handle operators
                  while (
                      stack.length > 0 &&
                      getPrecedence(ch) <= getPrecedence(stack[stack.length - 1])
                  ) {
                      result.push(stack.pop());
                  }
                  stack.push(ch); // Push the current operator to stack
              }
          }
  
          // Pop remaining operators from the stack
          while (stack.length > 0) {
              result.push(stack.pop());
          }
  
          console.log("Postfix expression: " + result.join(" "));
          return result;
      };
  
      // Function to perform a single arithmetic operation
      const performOperation = (op1, op2, operator) => {
          switch (operator) {
              case '+': return op1 + op2;
              case '-': return op2 - op1; // Ensure correct operand order
              case '*': return op1 * op2;
              case '/': return op2 / op1; // Ensure correct operand order
              default: throw new Error("Invalid operator: " + operator);
          }
      };
  
      // Function to evaluate a postfix expression
      const performCalculation = (postfix) => {
          const stack = [];
  
          for (const token of postfix) {
              if (!isNaN(token)) {
                  stack.push(parseFloat(token)); // Push numbers to stack
              } else {
                  const op1 = stack.pop();
                  const op2 = stack.pop();
                  stack.push(performOperation(op1, op2, token)); // Perform operation
              }
          }
  
          if (stack.length !== 1) {
              throw new Error("Invalid postfix expression");
          }
  
          console.log("Calculation result: " + stack[0]);
          return stack[0];
      };
  
      // Main calculation workflow
      try {
          const postfix = infixToPostfix(data); // Convert infix to postfix
          const result = performCalculation(postfix); // Evaluate postfix
  
          setData(result.toString()); // Update result in state
          setHistory([...history, { expression: data, result }]); // Update history
      } catch (error) {
          console.error("Error during calculation:", error);
      }
  };
  
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