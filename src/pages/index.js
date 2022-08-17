import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import TodoAdd from '../components/todo-add';
import TodoList from '../components/todo-list';

const Index = () => {
  const LOCAL_STORAGE_KEY = 'list-todos';
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    id: '',
    name: '',
    desc: ''
  });

  const addTodoHandler = todo => {
    const newTodo = [{ id: uuidv4(), name: todo.name, desc: todo.desc }];
    setTodos([...todos, ...newTodo]);
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...todos, ...newTodo])
    );
  };

  const updateTodoHandler = id => {
    const newData = todos.map(item => item.id == id ? {...item, name:todo.name, desc:todo.desc} : item);
    console.log(newData);
    setTodos(newData);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
  }


  const deleteTodoHandler = id => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
  };

  useEffect(() => {
    const listTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    listTodos && setTodos(listTodos);
  }, [setTodos]);

  return (
    <div>
      <h1 className='header-list'>Hello, Create Your Activity</h1>
      <br></br>
      <TodoAdd addHandler={addTodoHandler} todo={todo} setTodo={setTodo}/>
      <TodoList todos={todos} deleteTodos={deleteTodoHandler} updatedTodo={updateTodoHandler} />
    </div>
  );
};

export default Index;