import React from 'react';
import './History.css'; 

const History = ({ history, setHistory }) => {
  const deleteHistory = () => {
    setHistory([]);
  };

  const deleteCustomHistory = (indexToDelete) => {
    const updatedHistory = history.filter((_, index) => index !== indexToDelete);
    setHistory(updatedHistory);
  };

  return (
    <div className="history-container">
      <h2>Your History</h2>
      {history.length === 0 ? (
        <p className="no-history">No history available</p>
      ) : (
        <ul className="history-list">
          {history.map((item, index) => (
            <li key={index} className="history-item">
              <span>
                {item.expression} = <strong>{item.result}</strong>
              </span>
              <button
                className="delete-button"
                onClick={() => deleteCustomHistory(index)}
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
      )}
      {history.length > 0 && (
        <button className="delete-all-button" onClick={deleteHistory}>
          Clear All History
        </button>
      )}
    </div>
  );
};

export default History;