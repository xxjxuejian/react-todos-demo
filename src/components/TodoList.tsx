import React from "react";
import TodoItem from "./TodoItem";
import type { Todo } from "../types/todo";

// todos数组
interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void; // 👈 新增类型定义
  onRemoveTodo: (id: string) => void; // 👈 增加类型
  onToggleAll: (completed: boolean) => void; // 👈 增加类型
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleTodo,
  onRemoveTodo,
  onToggleAll,
}) => {
  return (
    <section className="main">
      {/* <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label> */}
      <div className="toggle-all-container">
        <input
          className="toggle-all"
          type="checkbox"
          id="toggle-all"
          data-testid="toggle-all"
          onChange={(e) => onToggleAll(e.target.checked)}
        ></input>
        <label className="toggle-all-label" htmlFor="toggle-all">
          Toggle All Input
        </label>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggleTodo}
              onRemove={onRemoveTodo}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default TodoList;
