// src/pages/ShowItemsPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiRefreshCw } from 'react-icons/fi';
import FilterControls from '../components/FilterControls/FilterControls';
import './ShowItemsPage.css';

const ShowItemsPage = () => {
  const navigate = useNavigate();
  
  // Sample data - replace with your actual data source
  const [allItems, setAllItems] = useState([
    { id: 1, name: 'Groceries', quantity: 5, price: 45.99, category: 'Food', date: '2023-05-15' },
    { id: 2, name: 'Gas', quantity: 1, price: 35.50, category: 'Transport', date: '2023-05-14' },
    { id: 3, name: 'Movie', quantity: 2, price: 24.00, category: 'Entertainment', date: '2023-05-12' }
  ]);

  const [filteredItems, setFilteredItems] = useState(allItems);
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    category: ''
  });

  const categories = ['All', 'Food', 'Transport', 'Entertainment', 'Bills', 'Other'];

  // Handle date filter changes
  const handleDateChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type === 'from' ? 'fromDate' : 'toDate']: value
    }));
  };

  // Handle category filter changes
  const handleCategoryChange = (e) => {
    setFilters(prev => ({
      ...prev,
      category: e.target.value
    }));
  };

  // Apply filters to items
  const handleFilter = () => {
    let result = [...allItems];
    
    if (filters.fromDate) {
      result = result.filter(item => item.date >= filters.fromDate);
    }
    
    if (filters.toDate) {
      result = result.filter(item => item.date <= filters.toDate);
    }
    
    if (filters.category && filters.category !== 'All') {
      result = result.filter(item => item.category === filters.category);
    }
    
    setFilteredItems(result);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      fromDate: '',
      toDate: '',
      category: ''
    });
    setFilteredItems(allItems);
  };

  // Calculate total cost
  const calculateTotal = () => {
    return filteredItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0).toFixed(2);
  };

  return (
    <div className="show-items-container">
      <header className="page-header">
        <h1>Personal Tracker</h1>
        <div className="page-actions">
          <button 
            className="action-btn"
            onClick={() => navigate('/add-item')}
          >
            Add Item
          </button>
          <button 
            className="action-btn active"
            onClick={() => navigate('/show-items')}
          >
            Show Items
          </button>
        </div>
      </header>

      <FilterControls
        onFilter={handleFilter}
        dateRange={{ from: filters.fromDate, to: filters.toDate }}
        onDateChange={handleDateChange}
        categories={categories}
        selectedCategory={filters.category}
        onCategoryChange={handleCategoryChange}
      />

      <div className="items-table-container">
        <table className="items-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="summary-section">
        <div className="total-cost">
          Total cost = ${calculateTotal()}
        </div>
        <button className="reset-btn" onClick={resetFilters}>
          <FiRefreshCw /> Reset
        </button>
      </div>
    </div>
  );
};

export default ShowItemsPage;