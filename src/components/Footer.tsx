import React from "react";
import type { FilterType } from "../types/todo";

interface FooterProps {
  count: number; // 未完成的任务数量
  filter: FilterType; // 👈 新增
  onFilterChange: (filter: FilterType) => void; // 👈 新增
  completedCount: number;
  onClearCompleted: () => void;
}

// filter状态用来设置三个按钮哪一个处于激活状态
const Footer: React.FC<FooterProps> = ({
  count,
  filter,
  onFilterChange,
  completedCount,
  onClearCompleted,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        剩<strong>{count}项</strong> 待办
      </span>
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={filter === "all" ? "selected" : ""}
            onClick={() => onFilterChange("all")}
          >
            全部
          </a>
        </li>
        <li>
          <a
            href="#/active"
            className={filter === "active" ? "selected" : ""}
            onClick={() => onFilterChange("active")}
          >
            未完成
          </a>
        </li>
        <li>
          <a
            href="#/completed"
            className={filter === "completed" ? "selected" : ""}
            onClick={() => onFilterChange("completed")}
          >
            已完成
          </a>
        </li>
      </ul>
      {/* 清除按钮稍后做 */}
      {/* 👇 如果有已完成的任务，显示按钮 */}
      {completedCount > 0 && (
        <>
          <button className="clear-completed" onClick={onClearCompleted}>
            清除已完成的任务
          </button>
        </>
      )}
    </footer>
  );
};

export default Footer;
