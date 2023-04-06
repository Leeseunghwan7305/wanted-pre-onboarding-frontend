import React from "react";
import { NonClickedTodoProps } from "../types/todo";

const NoClickedTodo = ({
  todo,
  retouchHandler,
  deleteTodo,
  id,
  isCompleted,
  checkBoxhandle,
}: NonClickedTodoProps) => {
  return (
    <>
      <li key={id}>
        <label>
          <input
            onClick={() => checkBoxhandle(id)}
            checked={isCompleted}
            type="checkbox"
            readOnly
          />
        </label>
        <span>{todo}</span>
        <button
          data-testid="modify-button"
          id={id}
          onClick={() => retouchHandler(id)}
        >
          수정
        </button>
        <button onClick={() => deleteTodo(id)} data-testid="delete-button">
          삭제
        </button>
      </li>
    </>
  );
};

export default React.memo(NoClickedTodo);
