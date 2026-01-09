import React, { useState } from "react";
import type { Todo } from "../types/todo";

// 定义组件需要接收的参数（Props），传递过来的是一条todo数据
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void; // 👈 新增类型定义
  onRemove: (id: string) => void; // 👈 增加类型
  onUpdate: (id: string, title: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onRemove,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false); // 是否处于编辑状态
  const [tempValue, setTempValue] = useState(""); // 临时存储编辑的值
  let editId: string | null = null;

  // 双击标签进入编辑状态
  const handleStartEdit = () => {
    setIsEditing(true);
    setTempValue(todo.title);
    editId = todo.id;
    console.log("editId", editId);
  };

  const handleOnBlur = () => {};
  const handleUpdate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("update", tempValue);
      console.log("editId", editId); // editId:null?? 原因是什么
      // onUpdate(editId!, tempValue);
      // setIsEditing(false);
      // setTempValue("");
      // editId = null;
    }
  };

  return (
    <li className={`${todo.completed ? "completed" : ""}`}>
      <div className="view">
        {isEditing ? (
          // 编辑状态,才显示这段模板
          <div className="input-container">
            <input
              id="edit-todo-input"
              type="text"
              autoFocus
              onChange={(e) => setTempValue(e.target.value)}
              onBlur={handleOnBlur}
              onKeyDown={handleUpdate}
              value={tempValue}
            />
          </div>
        ) : (
          <>
            <input
              type="checkbox"
              className="toggle"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <label onDoubleClick={handleStartEdit}>{todo.title}</label>
            <button className="destroy" onClick={() => onRemove(todo.id)} />
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
