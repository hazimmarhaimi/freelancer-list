import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';

const SearchBar = ({ filterValue, filterCriteria, handleFilterChange, handleGetFilter }) => {
  const filterOptions = ['Select All', 'Id', 'Username', 'PhoneNumber', 'Email', 'Skillsets', 'Hobby'];

  return (
    <div className='item_filter'>
      <tr>
        <td>
          <label htmlFor="filterCriteria" className="form-label lbl_filter">Filter by:</label>
        </td>
        <td>
          <select
            id="filterCriteria"
            className="form-select filterCriteria_select"
            value={filterCriteria}
            onChange={handleFilterChange}
          >
            {filterOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </td>
        <td>
          <input
            type="text"
            className="form-control filterValue_textbox"
            id="filterValue"
            value={filterValue}
            onChange={handleFilterChange}
          />
        </td>
        <td>
          <Button className='btn_filter btn' variant="primary" onClick={handleGetFilter}>
            <BsSearch />
          </Button>
        </td>
      </tr>
    </div>
  );
};

export default SearchBar;
