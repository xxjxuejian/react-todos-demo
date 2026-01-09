// src/types.ts
export interface Todo {
  id: string; // 唯一标识符
  title: string; // 任务内容
  completed: boolean; // 是否完成
}
// 👇 新增这个类型
export type FilterType = "all" | "active" | "completed";
