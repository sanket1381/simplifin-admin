import { useRoutes } from "react-router-dom";
import routes from "./Routes/route";

function App() {
  const routing = useRoutes(routes); // React renders based on this config
  return routing;
}

export default App