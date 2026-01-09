// src/components/Header.tsx
import React, { useState } from "react";

// 定义 Header 接收的参数类型
interface HeaderProps {
  // 拥有修改 App 内部数据权限的函数引用,实际上是在执行 App 里的那个函数
  onAddTodo: (title: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onAddTodo }) => {
  // 1. 本地状态，用来控制输入框的内容（受控组件模式）
  const [text, setText] = useState("");

  // 2. 处理按键事件
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 只有按下 Enter 键且内容不为空时才触发
    if (e.key === "Enter") {
      const trimmedText = text.trim();
      if (trimmedText !== "") {
        // 添加任务
        console.log("添加任务：", trimmedText);
        onAddTodo(trimmedText); // 调用父组件传来的函数
        setText(""); // 清空输入框
      }
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="接下来要做什么?"
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </header>
  );
};

export default Header;
