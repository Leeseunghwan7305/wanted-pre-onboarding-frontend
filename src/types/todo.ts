export type TodoProps = {
  id: string;
  isCompleted: boolean;
  todo: string;
  userId: number;
};

export type ClickedTodoProps = {
  editInput: string;
  editChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateTodo: (e: React.MouseEvent<HTMLButtonElement>) => void;
  cancelHandler: (id: string) => void;
  id: string;
  checkBoxhandle: (id: string) => void;
  isCompleted: boolean;
};

export type NonClickedTodoProps = {
  todo: string;
  retouchHandler: (id: string) => void;
  deleteTodo: (id: string) => void;
  id: string;
  isCompleted: boolean;
  checkBoxhandle: (id: string) => void;
};
