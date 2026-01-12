import { useState, useEffect } from "react";

// <T> 是泛型，表示我们不知道用户要存什么类型，让用户用的时候告诉我们
export function useLocalStorage<T>(key: string, initialValue: T) {
  // 1. 初始化 State
  // 我们传给 useState 一个函数，这样它只会在组件挂载时执行一次（Lazy Initialization）
  const [value, setValue] = useState<T>(() => {
    try {
      const jsonValue = localStorage.getItem(key);
      if (jsonValue != null) {
        return JSON.parse(jsonValue);
      }
    } catch (error) {
      console.error("读取 LocalStorage 失败:", error);
    }

    // 如果没有值，或者出错了，返回默认值
    return initialValue;
  });

  // 2. 监听变化并自动保存
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("保存 LocalStorage 失败:", error);
    }
  }, [key, value]); // 当 key 或 value 变化时执行

  // 3. 返回和 useState 一样的格式：[值, 修改函数]
  // as const 是为了告诉 TS，这个数组永远只有两个元素，类型固定
  return [value, setValue] as const;
}
