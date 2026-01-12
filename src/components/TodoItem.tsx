import React, { useState, useRef, useEffect } from "react";
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
  const [editText, setEditText] = useState(""); // 临时存储编辑的值
  // 引用输入框 DOM，为了自动聚焦
  const inputRef = useRef<HTMLInputElement>(null);
  // 在函数组件中，这不是声明一个全局变量，它在每一次渲染都会被重新创建并重置为 null
  // let editId: string | null = null;
  const editId = useRef<string | null>(null);

  // 双击标签进入编辑状态
  const handleStartEdit = () => {
    setIsEditing(true);
    setEditText(todo.title);
    editId.current = todo.id;
    // console.log("refDOM", inputRef.current); // null
    // inputRef.current?.focus(); // 自动聚焦输入框
    console.log("开始编辑", editId.current);
  };

  const handleOnBlur = () => {
    const text = editText.trim();
    if (text && text !== todo.title) {
      onUpdate(editId.current!, text);
    } else if (!text) {
      onRemove(todo.id);
    }
    console.log("blurblurblurblur");
    setIsEditing(false);
    setEditText("");
    editId.current = null;
  };
  const handleUpdate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("update", editText);
      console.log("editId", editId.current);
      onUpdate(editId.current!, editText);
      setEditText("");
      setIsEditing(false);
      editId.current = null;
    } else if (e.key === "Escape") {
      setEditText(todo.title);
      setIsEditing(false);
      editId.current = null;
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
