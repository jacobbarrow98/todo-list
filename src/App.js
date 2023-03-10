import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuid } from 'uuid';
import './App.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === '') return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuid(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <div className="app">
      <div>
        <h1 className="todo-list">Todo List</h1>
        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
        />
      </div>
      <div className="input-box">
        <input
          ref={todoNameRef}
          type="text"
        />
        <div className="input-button">
          <button onClick={handleAddTodo}>Add Todo</button>
          <button onClick={handleClearTodos}>Clear Completed</button>
        </div>
        <h2>{todos.filter((todo) => !todo.complete).length} left to do</h2>
      </div>
    </div>
  );
}

export default App;
