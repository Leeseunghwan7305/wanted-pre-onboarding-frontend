import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createTodoApi,
  deleteTodoApi,
  getTodoApi,
  updateTodoApi,
} from "../../api/todoApi";
import ClickedTodo from "../../components/clickedTodo";
import NoClickedTodo from "../../components/noClickedTodo";
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
      let id = e.currentTarget.id;
      let findTodo = todos.find((todo) => todo.id == id);
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

  //수정버튼을 눌렀을떄 실행되는 함수입니다.
  const retouchHandler = (id: string) => {
    let findTodo = todos.find((todo) => todo.id == id);
    if (findTodo) {
      setClickId(findTodo.id);
      setEditInput(findTodo.todo);
    }
    return;
  };

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
      await deleteTodoApi(id);
      const newTodo = todos.filter((todo) => todo.id != id);
      setTodo(newTodo);
    },
    [clickId, todos]
  );

  // 취소 버튼을 눌렀을떄 실행되는 함수입니다.
  const cancelHandler = (id: string) => {
    if (clickId == id) {
      setClickId("");
    }
  };

  return (
    <div className="todoList">
      <input
        ref={inputRef}
        data-testid="new-todo-input"
        onChange={inputHandler}
        placeholder="할일을 입력해주세요"
      />
      <button data-testid="new-todo-add-button" onClick={addTodo}>
        추가
      </button>
      <ul>
        {todos?.map((work: TodoProps) => {
          const { id, todo, isCompleted } = work;
          if (clickId == id)
            return (
              <ClickedTodo
                editInput={editInput}
                editChangeHandler={editChangeHandler}
                updateTodo={updateTodo}
                cancelHandler={cancelHandler}
                id={id}
                checkBoxhandle={checkBoxhandle}
                isCompleted={isCompleted}
              ></ClickedTodo>
            );
          else {
            return (
              <NoClickedTodo
                todo={todo}
                retouchHandler={retouchHandler}
                deleteTodo={deleteTodo}
                id={id}
                isCompleted={isCompleted}
                checkBoxhandle={checkBoxhandle}
              ></NoClickedTodo>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Todo;
