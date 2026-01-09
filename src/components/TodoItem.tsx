import React from "react";
import type { Todo } from "../types/todo";

// 定义组件需要接收的参数（Props），传递过来的是一条todo数据
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void; // 👈 新增类型定义
  onRemove: (id: string) => void; // 👈 增加类型
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onRemove }) => {
  return (
    <li className={todo.completed ? "completed" : ""}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <label>{todo.title}</label>
        {/* <button className="destroy" onClick={onRemove} /> */}
        <button className="destroy" onClick={() => onRemove(todo.id)} />
      </div>
    </li>
  );
};

export default TodoItem;
