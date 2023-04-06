import { instance } from "./axios";

export const createTodoApi = async (todo: string) => {
  const token = localStorage.getItem("token");
  const body = {
    todo,
  };
  return await instance.post("/todos", body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      withCredentials: true,
    },
  });
};

export const getTodoApi = async () => {
  const token = localStorage.getItem("token");
  return await instance.get("/todos", {
    headers: {
      Authorization: `Bearer ${token}`,
      withCredentials: true,
    },
  });
};

export const updateTodoApi = async (
  todo: string,
  isCompleted: boolean,
  id: string
) => {
  const token = localStorage.getItem("token");
  return await instance.put(
    `/todos/${id}`,
    {
      todo,
      isCompleted,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        withCredentials: true,
      },
    }
  );
};

export const deleteTodoApi = async (id: string) => {
  const token = localStorage.getItem("token");
  return await instance.delete(`/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      withCredentials: true,
    },
  });
};
