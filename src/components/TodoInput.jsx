import React from 'react';

function TodoInput({ inputValue, setInputValue, addTodo }) {
  return (
    <div className="input-area">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={addTodo}>Add Task</button>
    </div>
  );
}

export default TodoInput;
