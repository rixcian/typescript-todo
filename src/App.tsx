import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { FormElem, ITodo } from "./types";

import TodoList from "./components/TodoList";

import "./App.scss";


const App: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect((): void => {
    if (window.localStorage) {
      let storageTodos: string | null = localStorage.getItem("ts-todos");
      if (storageTodos) {
        const storageObject: ITodo[] = JSON.parse(storageTodos);
        setTodos(storageObject);
      }
    }
  }, []);

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [{ text, completed: false }, ...todos];
    setTodos(newTodos);
    localStorage.setItem("ts-todos", JSON.stringify(newTodos));
  };

  const completedTodo = (index: number): void => {
    let todo: ITodo = todos[index];
    todo.completed = !todo.completed;

    let newTodos: ITodo[] = todos.filter((item, i) => i !== index);
    newTodos = todo.completed ? [...newTodos, todo] : [todo, ...newTodos];

    setTodos(newTodos);
    localStorage.setItem("ts-todos", JSON.stringify(newTodos));
  };

  const removeTodo = (index: number): void => {
    let newTodos: ITodo[] = todos.filter((item, i) => i !== index);
    setTodos(newTodos);
    localStorage.setItem("ts-todos", JSON.stringify(newTodos));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="heading-1">Todo List</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group
            controlId="formTodoText"
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              className="form-control"
              type="text"
              value={value}
              onChange={e => setValue(e.target.value)}
              required
            />
            <Button variant="dark" type="submit" className="btn-add">
              Add
            </Button>
          </Form.Group>
        </Form>

        <TodoList
          todos={todos}
          completedTodo={completedTodo}
          removeTodo={removeTodo}
        />
      </header>
    </div>
  );
};

export default App;
