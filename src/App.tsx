import { useRoutes } from "react-router-dom";
import { routes } from "./Routes";
import "./style/globals.scss";
function App() {
  const elem = useRoutes(routes);
  return <div>{elem}</div>;
}

export default App;
