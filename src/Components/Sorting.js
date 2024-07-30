import React from 'react';

const Sorting = ({ onSort }) => (
  <div>
    <button onClick={() => onSort('id')}>Sort by ID</button>
    <button onClick={() => onSort('firstName')}>Sort by Name</button>
    <button onClick={() => onSort('age')}>Sort by Age</button>
    <button onClick={() => onSort('gender')}>Sort by Gender</button>
  </div>
);

export default Sorting;
