// Helper function to determine operator precedence
const getPrecedence = (ch) => {
    if (ch === '^') return 3;
    else if (ch === '*' || ch === '/') return 2;
    else if (ch === '+' || ch === '-') return 1;
    return -1;
  };
  
  // Function to convert an infix expression to a postfix expression
  const infixToPostfix = (data) => {
    const result = [];
    const stack = [];
  
    for (let i = 0; i < data.length; i++) {
      const ch = data[i];
  
      if (!isNaN(ch) || ch === '.') {
        let number = '';
        while (i < data.length && (!isNaN(data[i]) || data[i] === '.')) {
          number += data[i];
          i++;
        }
        i--;
        result.push(number);
      } else if (ch === '(') {
        stack.push(ch);
      } else if (ch === ')') {
        while (stack.length > 0 && stack[stack.length - 1] !== '(') {
          result.push(stack.pop());
        }
        stack.pop();
      } else {
        while (
          stack.length > 0 &&
          getPrecedence(ch) <= getPrecedence(stack[stack.length - 1])
        ) {
          result.push(stack.pop());
        }
        stack.push(ch);
      }
    }
  
    while (stack.length > 0) {
      result.push(stack.pop());
    }
  
    return result;
  };
  
  // Function to perform a single arithmetic operation
  const performOperation = (op1, op2, operator) => {
    switch (operator) {
      case '+':
        return op1 + op2;
      case '-':
        return op2 - op1;
      case '*':
        return op1 * op2;
      case '/':
        return op2 / op1;
      default:
        throw new Error('Invalid operator: ' + operator);
    }
  };
  
  // Function to evaluate a postfix expression
  const performCalculation = (postfix) => {
    const stack = [];
  
    for (const token of postfix) {
      if (!isNaN(token)) {
        stack.push(parseFloat(token));
      } else {
        const op1 = stack.pop();
        const op2 = stack.pop();
        stack.push(performOperation(op1, op2, token));
      }
    }
  
    if (stack.length !== 1) {
      throw new Error('Invalid postfix expression');
    }
  
    return stack[0];
  };
  
  // Main calculate function
  export const calculate = (data) => {
    const postfix = infixToPostfix(data);
    return performCalculation(postfix);
  };