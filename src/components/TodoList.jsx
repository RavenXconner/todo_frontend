import React from 'react';
import TodoItem from './TodoItem';

function TodoList({
  filteredTodos,
  isEditing,
  editingText,
  toggleComplete,
  editTodo,
  saveEdit,
  setEditingText,
  deleteTodo
}) {
  return (
    <ul className="todo-list">
      {filteredTodos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          index={index}
          isEditing={isEditing}
          editingText={editingText}
          toggleComplete={toggleComplete}
          editTodo={editTodo}
          saveEdit={saveEdit}
          setEditingText={setEditingText}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
