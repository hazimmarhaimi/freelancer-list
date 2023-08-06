import React from 'react';
import { Button } from 'react-bootstrap';

const SearchBar = ({ filterId, handleFilterChange, handleGetFilter }) => {
  return (
    <div className='item_filter'>
        <tr>
            <td>
                <label htmlFor="filterId" className="form-label lbl_filter">Filter by ID:</label>
            </td>
            <td>
                <input
                    type="text"
                    className="form-control filterId_textbox"
                    id="filterId"
                    value={filterId}
                    onChange={handleFilterChange}
                />
                </td>
                <td>
                    <Button className='btn_filter btn' variant="primary" onClick={handleGetFilter}>
                        Get Filter
                    </Button>
                
                </td>
        </tr>
    </div>
  );
};

export default SearchBar;
