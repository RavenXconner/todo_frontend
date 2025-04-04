import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import DarkModeToggle from './components/DarkModeToggle';

const API_URL = 'http://127.0.0.1:8000/api/todos/';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [isEditing, setIsEditing] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setDarkMode(true);
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const addTodo = () => {
    if (inputValue.trim() === '') return;
    const newTodo = { text: inputValue, completed: false };
    axios.post(API_URL, newTodo)
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.error('Error adding todo:', error));
    setInputValue('');
  };

  const toggleComplete = (id) => {
    const todo = todos.find(todo => todo.id === id);
    axios.put(`${API_URL}${id}/`, { ...todo, completed: !todo.completed })
      .then(response => setTodos(todos.map(t => (t.id === id ? response.data : t))))
      .catch(error => console.error('Error updating todo:', error));
  };

  const deleteTodo = (id) => {
    axios.delete(`${API_URL}${id}/`)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(error => console.error('Error deleting todo:', error));
  };

  const editTodo = (id, text) => {
    setIsEditing(id);
    setEditingText(text);
  };

  const saveEdit = (id) => {
    axios.put(`${API_URL}${id}/`, { text: editingText })
      .then(response => {
        setTodos(todos.map(t => (t.id === id ? response.data : t)));
        setIsEditing(null);
      })
      .catch(error => console.error('Error editing todo:', error));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <h1>Enhanced To-Do List</h1>
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <TodoInput inputValue={inputValue} setInputValue={setInputValue} addTodo={addTodo} />
      <TodoFilters setFilter={setFilter} />
      <TodoList
        filteredTodos={filteredTodos}
        isEditing={isEditing}
        editingText={editingText}
        toggleComplete={toggleComplete}
        editTodo={editTodo}
        saveEdit={saveEdit}
        setEditingText={setEditingText}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;