import React from 'react';

function TodoItem({
  todo,
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
      {isEditing === todo.id ? (
        <>
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
          />
          <button onClick={() => saveEdit(todo.id)}>Save</button>
        </>
      ) : (
        <>
          <span>{todo.text}</span>
          <button onClick={() => toggleComplete(todo.id)}>
            {todo.completed ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => editTodo(todo.id, todo.text)}>Edit</button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
