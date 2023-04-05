import { lazy } from "react";
import GlobalLayout from "./pages/_layout";

const InitPage = lazy(() => import("./pages/init"));

export const routes = [
  {
    path: "/",
    element: <GlobalLayout />,
    children: [{ index: true, element: <InitPage /> }],
  },
];

export const pages = [{ route: "/" }];
