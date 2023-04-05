import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hook/useInput";
import "./index.scss";
const Todo = () => {
  const navigator = useNavigate();
  const [todo, setTodo] = useState<any>([]);
  const [todoInput, inputHandler] = useInput("");

  useEffect(() => {
    const tokenCheck = localStorage.getItem("token");
    if (!tokenCheck) {
      navigator("/signin", { replace: true });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", todo);
  }, [todo]);

  const addTodo = () => {};

  return (
    <div className="todoList">
      <input
        value={todoInput}
        data-testid="new-todo-input"
        onChange={inputHandler}
        placeholder="할일을 입력해주세요"
      />
      <button data-testid="new-todo-add-button" onClick={addTodo}>
        추가
      </button>
      <ul>
        <li>
          <label>
            <input type="checkbox" />
            <span>TODO 1</span>
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" />
            <span>TODO 2</span>
          </label>
        </li>
      </ul>
    </div>
  );
};

export default Todo;

// 추가 button을 클릭하면 입력 input의 내용이 새로운 TODO로 추가되도록 해주세요

// TODO를 추가 한 뒤 새로고침을 해도 추가한 TODO가 목록에 보여야 합니다.
