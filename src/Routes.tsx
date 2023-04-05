import { lazy } from "react";
import GlobalLayout from "./pages/_layout";

const InitPage = lazy(() => import("./pages/init"));
const SignInPage = lazy(() => import("./pages/signin"));
const SignUpPage = lazy(() => import("./pages/signup"));

export const routes = [
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      { index: true, element: <InitPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/signin", element: <SignInPage /> },
    ],
  },
];

export const pages = [{ route: "/" }];
