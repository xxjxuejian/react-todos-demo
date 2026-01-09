import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.tsx";

// 👇 添加这一行 : TodoMVC 提供了一套非常漂亮的、标准的 CSS 库
import "todomvc-app-css/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
