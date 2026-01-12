import React, { useState, useRef, useEffect } from "react";
import type { Todo } from "../types/todo";

// 定义组件需要接收的参数（Props），传递过来的是一条todo数据
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void; // 👈 新增类型定义
  onRemove: (id: string) => void; // 👈 增加类型
  onUpdate: (id: string, title: string) => void;
  isEditing: boolean; // 是否处于编辑状态
  setEditingId: (id: string | null) => void; // 设置编辑的id
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onRemove,
  onUpdate,
  isEditing,
  setEditingId,
}) => {
  const [editText, setEditText] = useState(""); // 临时存储编辑的值
  const inputRef = useRef<HTMLInputElement>(null);

  // 双击标签进入编辑状态
  const handleStartEdit = () => {
    setEditingId(todo.id); // 通知父组件，当前正在编辑的todo id
    setEditText(todo.title); // 初始化编辑内容
    console.log("开始编辑");
  };

  const handleOnBlur = () => {
    console.log("blur");
    const text = editText.trim();
    if (text) {
      if (text !== todo.title) {
        onUpdate(todo.id, text);
      }
      setEditingId(null);
    }
    // 如果删光了文字，通常视为删除任务
    else {
      onRemove(todo.id);
      setEditingId(null); // 取消编辑状态
    }
  };
  const handleUpdate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("update", editText);
      onUpdate(todo.id, editText);
      setEditingId(null);
    } else if (e.key === "Escape") {
      setEditText(todo.title); // 恢复原状
      setEditingId(null); // 取消编辑状态
    }
  };

  // 自动聚焦 (Focus Management)
  // 当 isEditing 变为 true 时，我们需要让 input 获得焦点
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  /* 
    className={todo.completed ? "completed" : "" + (isEditing ? " editing" : "")} 这个写法不对
    className={`${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}
    需要绑定多个类，类与类是之间需要空格的，那么就要用字符串包裹，但是字符串里面需要写变量，所以需要用模板字符串
    模板字符串：${}，${expression}内部可以直接嵌入js表达式
    为什么用两个${}，因为两个类之间需要一个空格分隔
  */
  return (
    <li
      className={`${todo.completed ? "completed" : ""} ${
        isEditing ? "editing" : ""
      }`}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <label onDoubleClick={handleStartEdit}>{todo.title}</label>
        <button className="destroy" onClick={() => onRemove(todo.id)} />
      </div>

      {/* 👇 编辑用的输入框 */}
      {isEditing && (
        <input
          ref={inputRef}
          className="edit"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleOnBlur}
          onKeyDown={handleUpdate}
        />
      )}
    </li>
  );
};

export default TodoItem;
