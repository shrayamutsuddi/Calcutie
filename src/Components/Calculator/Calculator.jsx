import React, { useState } from 'react';
import './Calculator.css';
import Display from '../Display/Display';
import History from '../History/History';
import { calculate } from '../../util/calculatorUtuls';

const Calculator = () => {
  const [data, setData] = useState('');
  const [history, setHistory] = useState([]);

  const buttonValues = [
    '(', ')', '%', 'AC',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '/', '=', 'C',
  ];

  const handleButtonClick = (event) => {
    const value = event.target.value;

    if (value === 'AC') {
      reset();
    } else if (value === 'C') {
      backspace();
    } else if (value === '=') {
      handleCalculate();
    } else {
      setData(data.concat(value));
    }
  };

  const backspace = () => {
    setData(data.slice(0, -1));
  };

  const reset = () => {
    setData('');
  };

  const handleCalculate = () => {
    try {
      const result = calculate(data);
      setData(result.toString());
      setHistory([...history, { expression: data, result }]);
    } catch (error) {
      console.error('Error during calculation:', error);
      setData('Error');
    }
  };

  return (
    <div className="container">
      <div className="calculator">
        <Display data={data} />
        <div className="grid grid-cols-4 gap-3">
          {buttonValues.map((value) => (
            <button
              key={value}
              onClick={handleButtonClick}
              value={value}
            >
              {value}
            </button>
          ))}
        </div>
        <History history={history} setHistory={setHistory} />
      </div>
    </div>
  );
};

export default Calculator;