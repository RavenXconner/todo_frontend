import React from 'react';

function TodoFilters({ setFilter }) {
  return (
    <div className="filters">
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('completed')}>Completed</button>
      <button onClick={() => setFilter('pending')}>Pending</button>
    </div>
  );
}

export default TodoFilters;
