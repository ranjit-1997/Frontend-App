import React from 'react';

const Filtering = ({ onFilter }) => (
  <div>
    <input type="text" placeholder="ID" onChange={(e) => onFilter('id', e.target.value)} />
    <input type="text" placeholder="Name" onChange={(e) => onFilter('firstName', e.target.value)} />
    <input type="text" placeholder="Age" onChange={(e) => onFilter('age', e.target.value)} />
    <input type="text" placeholder="Gender M/F" onChange={(e) => onFilter('gender', e.target.value)} />
  </div>
);

export default Filtering;
