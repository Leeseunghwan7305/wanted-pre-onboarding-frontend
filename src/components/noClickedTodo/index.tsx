import React from "react";
import { NonClickedTodoProps } from "../../types/todo";
import "./index.scss";
const NoClickedTodo = ({
  todo,
  retouchHandler,
  deleteTodo,
  id,
  isCompleted,
  checkBoxhandle,
}: NonClickedTodoProps) => {
  return (
    <div className="nonClickTodo">
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
        <div>
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
        </div>
      </li>
    </div>
  );
};

export default React.memo(NoClickedTodo);
