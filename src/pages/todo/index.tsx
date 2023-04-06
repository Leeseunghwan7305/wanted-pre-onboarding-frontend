import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createTodoApi,
  deleteTodoApi,
  getTodoApi,
  updateTodoApi,
} from "../../api/todoApi";
import useInput from "../../hook/useInput";
import { TodoProps } from "../../types/todo";
import { tokenTest } from "../../util/tokenTest";
import "./index.scss";

const Todo = () => {
  const navigator = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  //todo를 담고있는 상태데이터입니다
  const [todos, setTodo] = useState<TodoProps[]>([]);
  //todo를 추가할떄의 input state입니다.
  const [todoInput, inputHandler] = useInput("");
  //todo를 수정할떄의 input state입니다.
  const [editInput, setEditInput] = useState("");
  //내가 최근 클릭한 todo의 id를 관리합니다.
  const [clickId, setClickId] = useState("");

  //token이 없다면 signin으로 리다이렉팅됩니다.
  useEffect(() => {
    if (!tokenTest()) {
      navigator("/signin", { replace: true });
    } else {
      (async () => {
        const result = await getTodoApi();
        setTodo(result.data);
      })();
    }
  }, []);

  //수정할떄 쓰이는 input창의 값을 업데이트해주는 함수입니다.
  const editChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditInput(e.target.value);
    },
    []
  );

  //todo를 더해주는 함수입니다.
  const addTodo = async () => {
    try {
      const res = await createTodoApi(todoInput);
      setTodo((pre) => [...pre, res.data]);
      inputRef.current?.focus();
      inputRef.current!.value = "";
    } catch (e) {
      alert("만들기 실패");
    }
  };

  //todo를 업데이트해주는 함수입니다.
  const updateTodo = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      const id = e.currentTarget.id;
      let findTodo = todos.find((todo) => todo.id == id);

      if (e.currentTarget.innerText == "수정" && findTodo) {
        setClickId(findTodo.id);
        setEditInput(findTodo.todo);
        return;
      }

      if (findTodo) {
        try {
          const result = await updateTodoApi(
            editInput,
            findTodo.isCompleted,
            findTodo.id
          );
          let newTodo = todos.map((todo) =>
            todo.id == result.data?.id ? result.data : todo
          );
          setTodo(newTodo);
          setClickId("");
        } catch (e) {
          console.log("실패ㅜㅜ");
        }
      }
    },
    [editInput, todos]
  );

  //checkbox를 업데이트해주는 함수입니다.
  const checkBoxhandle = useCallback(
    async (id: string) => {
      let findTodo = todos.find((todo) => todo.id == id);
      if (findTodo) {
        findTodo.isCompleted = !findTodo?.isCompleted;
        let newTodo = todos.map((todo) =>
          todo.id == findTodo?.id ? findTodo : todo
        );
        await updateTodoApi(findTodo.todo, findTodo.isCompleted, id);
        setTodo(() => newTodo);
      }
    },
    [todos]
  );

  //todo를 삭제해주는 함수입니다.
  const deleteTodo = useCallback(
    async (id: string) => {
      if (clickId == id) {
        setClickId("");
        return;
      } else {
        await deleteTodoApi(id);
        const newTodo = todos.filter((todo) => todo.id != id);
        setTodo(newTodo);
      }
    },
    [clickId, todos]
  );

  return (
    <div className="todoList">
      <input
        ref={inputRef}
        data-testid="new-todos-input"
        onChange={inputHandler}
        placeholder="할일을 입력해주세요"
      />
      <button data-testid="new-todos-add-button" onClick={addTodo}>
        추가
      </button>
      <ul>
        {todos?.map((work: TodoProps) => {
          const { id, todo, isCompleted } = work;
          return (
            <li key={id}>
              <label>
                <input
                  onClick={() => checkBoxhandle(id)}
                  checked={isCompleted}
                  type="checkbox"
                  readOnly
                />
                {clickId == id ? (
                  <input
                    data-testid="modify-input"
                    value={editInput}
                    onChange={editChangeHandler}
                    placeholder="수정될 내용을 입력해주세요"
                  ></input>
                ) : (
                  <span>{todo}</span>
                )}
                <button
                  data-testid="submit-button"
                  id={id}
                  onClick={updateTodo}
                >
                  {clickId == id ? "제출" : "수정"}
                </button>
                <button
                  onClick={() => deleteTodo(id)}
                  data-testid="cancel-button"
                >
                  {clickId == id ? "취소" : "삭제"}
                </button>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
