import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToDo from "./pages/old_todo";
import "./App.scss";
import { LocalizationProvider, plPL } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TodoPage from "./pages/TodoPage";
import store from "./app/store";
import { selectTheme } from "./features/theme/themeSlice";
import { useAppSelector } from "./app/hooks";
import { useEffect } from "react";
const Layout = () => {
  const theme = useAppSelector(selectTheme);
  useEffect(() => {
    document.getElementById("root")!.className = theme;
  }, [theme]);
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <TodoPage />,
      },
      {
        path: "/old",
        element: <ToDo />,
      },
    ],
  },
]);

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={plPL}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  );
};

export default App;
