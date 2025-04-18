import { useRoutes } from "react-router-dom";
import routes from "./Routes/route";

function App() {
  const routing = useRoutes(routes); 
  return routing;
}

export default App