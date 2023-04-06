import React from "react";
import { ClickedTodoProps } from "../types/todo";

const ClickedTodo = ({
  editInput,
  editChangeHandler,
  updateTodo,
  cancelHandler,
  id,
  checkBoxhandle,
  isCompleted,
}: ClickedTodoProps) => {
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
        <input
          data-testid="modify-input"
          value={editInput}
          onChange={editChangeHandler}
          placeholder="수정될 내용을 입력해주세요"
        ></input>
        <button id={id} onClick={updateTodo} data-testid="submit-button">
          제출
        </button>
        <button onClick={() => cancelHandler(id)} data-testid="cancel-button">
          취소
        </button>
      </li>
    </>
  );
};

export default React.memo(ClickedTodo);
