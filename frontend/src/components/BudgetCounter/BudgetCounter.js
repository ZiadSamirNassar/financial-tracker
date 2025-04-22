import React, { useState } from 'react';
import './BudgetCounter.css';

function BudgetCounter({ currentBudget, onUpdateBudget }) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleAddBudget = () => {
    const amount = parseFloat(inputValue);
    
    if (isNaN(amount)) {
      setError('Please enter a valid number');
      return;
    }
    
    if (amount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    if (amount > 1000000) {
      setError('Amount cannot exceed $1,000,000');
      return;
    }

    onUpdateBudget(amount);
    setInputValue('');
    setError('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddBudget();
    }
  };

  return (
    <div className="budget-counter">
      <div className="budget-display">
        <span className="budget-label">Current Budget:</span>
        <span className="budget-amount">${currentBudget.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}</span>
      </div>
      
      <div className="budget-controls">
        <div className="input-group">
          <span className="currency-symbol">$</span>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            placeholder="Enter amount"
            min="0"
            step="0.01"
            className={error ? 'error-input' : ''}
          />
        </div>
        
        <button 
          onClick={handleAddBudget}
          disabled={!inputValue}
          className="add-button"
        >
          Add to Budget
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default BudgetCounter;