import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import type { Todo, FilterType } from "./types/todo";

/* 
为什么修改数据的函数一定要定义在App中，然后逐层向下传递，可以想vue中那种发送事件给父组件吗？react中没有这种机制
即使把函数传递子组件中，但是子组件中应该拿不到全部的数据吧
*/
function App() {
  // 1. 定义状态：todos 列表
  // 初始化时尝试读取
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "学习 React", completed: true },
    { id: "2", title: "写一个 TodoMVC", completed: false },
  ]);

  // 添加新的todo的方法
  function addTodo(title: string) {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
    };

    // 重新给todos赋值,创建一个新数组（旧数组 + 新项）
    setTodos([...todos, newTodo]);
  }

  // 全部的todo状态切换
  function toggleAll(completed: boolean) {
    setTodos(todos.map((todo) => ({ ...todo, completed })));
  }

  // 任务状态切换
  function toggleTodo(id: string) {
    const clickedItem = todos.find((todo) => todo.id === id);
    if (clickedItem) {
      clickedItem.completed = !clickedItem.completed;
    }
    setTodos([...todos]);
  }

  // 新增 removeTodo 函数
  const removeTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 计算属性（Derived State），未完成的todo的数量
  const activeCount = todos.filter((todo) => !todo.completed).length;

  // 过滤状态
  const [filter, setFilter] = useState<FilterType>("all");
  function getFilteredTodos() {
    console.log("11111");
    switch (filter) {
      case "all":
        return todos;
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }

  // 清除已完成任务
  const clearCompleted = () => {
    // 删除已经完成的，只保留未完成的
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // 计算是否有已完成的任务（用于控制按钮显示）
  const completedCount = todos.length - activeCount;

  // 更新todo内容
  const updateTodo = (id: string, title: string) => {
    const todo = todos.find((todo) => todo.id === id);
    console.log("编辑id", todo, id, title);
    if (todo) {
      todo.title = title;
    }
    setTodos([...todos]);
  };

  return (
    <>
      <div className="todoapp">
        <Header onAddTodo={addTodo} />
        {/* 2. 把数据传递给子组件 */}
        {/* 只有当有任务时才显示 TodoList 和 Footer */}
        {todos.length > 0 && (
          <>
            <TodoList
              todos={getFilteredTodos()}
              onToggleTodo={toggleTodo}
              onRemoveTodo={removeTodo}
              onToggleAll={toggleAll}
              onUpdateTodo={updateTodo}
            />
            <Footer
              count={activeCount}
              filter={filter}
              onFilterChange={setFilter}
              completedCount={completedCount}
              onClearCompleted={clearCompleted}
            />
          </>
        )}
      </div>
    </>
  );
}

export default App;
