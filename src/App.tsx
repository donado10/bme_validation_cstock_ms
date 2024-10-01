import "./App.css";

import route_warehouse from "./Routes/Warehouse";
import route_home from "./Routes/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([...route_home, ...route_warehouse]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
