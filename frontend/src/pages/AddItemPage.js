import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BudgetCounter from '../components/BudgetCounter/BudgetCounter';
import AddItemForm from '../components/AddItemForm/AddItemForm';
import ItemCounter from '../components/ItemCounter/ItemCounter';
import './AddItemPage.css';

function AddItemPage() {
  const [items, setItems] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [budget, setBudget] = useState(() => {
    // Initialize budget from localStorage or default to 1000
    const savedBudget = localStorage.getItem('budget');
    return savedBudget ? parseFloat(savedBudget) : 1000;
  });
  const navigate = useNavigate();

  // Save budget to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('budget', budget.toString());
  }, [budget]);

  const handleAddItem = (newItem) => {
    const itemCost = parseFloat(newItem.price) * parseInt(newItem.quantity);
    const newItems = [...items, newItem];
    setItems(newItems);
    setTotalSpent(prev => prev + itemCost);
    
    // Save items to localStorage
    localStorage.setItem('financeItems', JSON.stringify(newItems));
  };

  const handleUpdateBudget = (amount) => {
    setBudget(prev => prev + amount);
  };

  const handleResetBudget = () => {
    if (window.confirm('Are you sure you want to reset your budget ?')) {
      setBudget(0);
      setTotalSpent(0);
      setItems([]);
      localStorage.removeItem('financeItems');
    }
  };
  

  // Load saved items on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem('financeItems');
    if (savedItems) {
      const parsedItems = JSON.parse(savedItems);
      setItems(parsedItems);
      
      // Calculate total spent from saved items
      const calculatedTotal = parsedItems.reduce((sum, item) => {
        return sum + (parseFloat(item.price) * parseInt(item.quantity));
      }, 0);
      setTotalSpent(calculatedTotal);
    }
  }, []);

  const remainingBudget = budget - totalSpent;

  return (
    <div className="add-item-page">
      <header className="page-header">
        <h1>Personal Finance Tracker</h1>
        <div className="page-actions">
          <button 
            className="action-btn active"
            onClick={() => navigate('/add-item')}
          >
            Add Item
          </button>
          <button 
            className="action-btn"
            onClick={() => navigate('/show-items')}
          >
            Show Items
          </button>
          <button 
            className="action-btn reset-btn"
            onClick={handleResetBudget}
          >
            Reset Budget
          </button>
        </div>
      </header>
      
      <BudgetCounter 
        currentBudget={budget}
        onUpdateBudget={handleUpdateBudget} 
      />
      
      <div className="summary-cards">
        <div className="summary-card">
          <span className="summary-label">Items Added</span>
          <ItemCounter count={items.length} />
        </div>
        <div className="summary-card">
          <span className="summary-label">Total Spent</span>
          <div className="total-spent">${totalSpent.toFixed(2)}</div>
        </div>
        <div className="summary-card">
          <span className="summary-label">Remaining Budget</span>
          <div className={`remaining-budget ${
            remainingBudget < 0 ? 'negative' : remainingBudget < budget * 0.2 ? 'warning' : ''
          }`}>
            ${remainingBudget.toFixed(2)}
          </div>
        </div>
      </div>
      
      <AddItemForm onAddItem={handleAddItem} />
    </div>
  );
}

export default AddItemPage;