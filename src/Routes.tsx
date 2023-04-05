import { lazy } from "react";
import Todo from "./pages/todo";
import GlobalLayout from "./pages/_layout";

const InitPage = lazy(() => import("./pages/init"));
const SignInPage = lazy(() => import("./pages/signin"));
const SignUpPage = lazy(() => import("./pages/signup"));
const TodoPage = lazy(() => import("./pages/todo"));
export const routes = [
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      { index: true, element: <InitPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/signin", element: <SignInPage /> },
      { path: "/todo", element: <TodoPage /> },
    ],
  },
];

export const pages = [{ route: "/" }];
