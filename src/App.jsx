import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import DarkModeToggle from './components/DarkModeToggle';

const API_URL = 'https://todo-backend-i7yq.onrender.com/api/todos/';
const LOGIN_URL = 'https://todo-backend-i7yq.onrender.com/api-token-auth/';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [isEditing, setIsEditing] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const loginUser = async () => {
    try {
      const response = await axios.post(LOGIN_URL, { username, password });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    if (token) {
      const getAuthHeaders = () => ({
        headers: { Authorization: `Token ${token}` }
      });

      axios.get(API_URL, getAuthHeaders())
        .then(response => setTodos(response.data))
        .catch(error => console.error('Error fetching todos:', error));
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setDarkMode(true);
  }, [token]);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const addTodo = () => {
    if (inputValue.trim() === '') return;
    const newTodo = { text: inputValue, completed: false };

    axios.post(API_URL, newTodo, {
      headers: { Authorization: `Token ${token}` }
    })
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.error('Error adding todo:', error));

    setInputValue('');
  };

  const toggleComplete = (id) => {
    const todo = todos.find(todo => todo.id === id);
    axios.put(`${API_URL}${id}/`, { ...todo, completed: !todo.completed }, {
      headers: { Authorization: `Token ${token}` }
    })
      .then(response => setTodos(todos.map(t => (t.id === id ? response.data : t))))
      .catch(error => console.error('Error updating todo:', error));
  };

  const deleteTodo = (id) => {
    axios.delete(`${API_URL}${id}/`, {
      headers: { Authorization: `Token ${token}` }
    })
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(error => console.error('Error deleting todo:', error));
  };

  const editTodo = (id, text) => {
    setIsEditing(id);
    setEditingText(text);
  };

  const saveEdit = (id) => {
    axios.put(`${API_URL}${id}/`, { text: editingText }, {
      headers: { Authorization: `Token ${token}` }
    })
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

      {!token ? (
        <div className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={loginUser}>Login</button>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default App;
