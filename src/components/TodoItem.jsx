import React from 'react';

function TodoItem({
  todo,
  index,
  isEditing,
  editingText,
  toggleComplete,
  editTodo,
  saveEdit,
  setEditingText,
  deleteTodo
}) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing === index ? (
        <>
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
          />
          <button onClick={() => saveEdit(index)}>Save</button>
        </>
      ) : (
        <>
          <span>{todo.text}</span>
          <button onClick={() => toggleComplete(index)}>
            {todo.completed ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => editTodo(index)}>Edit</button>
          <button onClick={() => deleteTodo(index)}>Delete</button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
