// src/components/FilterControls/FilterControls.js
import React from 'react';
import { FiFilter } from 'react-icons/fi';
import './FilterControls.css';

const FilterControls = ({ 
  onFilter, 
  dateRange,
  onDateChange,
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="filter-controls">
      <h3>Show Items</h3>
      
      <div className="filter-row">
        <div className="filter-group">
          <label>Filter by Date</label>
          <div className="date-range">
            <input
              type="date"
              name="fromDate"
              value={dateRange.from}
              onChange={(e) => onDateChange('from', e.target.value)}
              placeholder="From"
            />
            <span>to</span>
            <input
              type="date"
              name="toDate"
              value={dateRange.to}
              onChange={(e) => onDateChange('to', e.target.value)}
              placeholder="To"
            />
          </div>
        </div>

        <div className="filter-group">
          <label>Filter by Category</label>
          <select
            value={selectedCategory}
            onChange={onCategoryChange}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <button className="filter-btn" onClick={onFilter}>
          <FiFilter /> Filter
        </button>
      </div>
    </div>
  );
};

export default FilterControls;