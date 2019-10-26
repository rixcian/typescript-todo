import React from "react";
import { ITodo, ITodoListProps } from "../types";

import './TodoList.scss';

const getTodoCompletedStyles = (completed: boolean): React.CSSProperties => {
  if (completed) {
    return { textDecoration: "line-through" };
  }
  return {};
};

const TodoList: React.FC<ITodoListProps> = ({ todos, completedTodo, removeTodo }) => {
  return (
    <div>
      <ul className="todo-list">
        {todos.map((todo: ITodo, index: number) => (
          <li
            key={index}
            className="todo-item"
          >
            <input
              className="form-control todo-checkbox"
              type="checkbox"
              checked={todo.completed}
              onChange={() => completedTodo(index)}
            />
            <span style={getTodoCompletedStyles(todo.completed)}>
              {todo.text} > Completed: {todo.completed ? "Yes" : "No"}
            </span>
            <span 
              role="img" 
              aria-label="Delete Todo" 
              className="btn-remove" 
              onClick={() => removeTodo(index)}
            >
              ❌
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
