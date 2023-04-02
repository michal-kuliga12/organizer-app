import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import ToDo from "./pages/Todo";
import "./App.scss";
import { LocalizationProvider, plPL } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Test from "./pages/Test";
import store from "./app/store";
import { selectTheme } from "./features/theme/themeSlice";
import { useAppSelector } from "./app/hooks";

const Layout = () => {
  const theme = useAppSelector(selectTheme);
  return (
    <div className="app" id={theme}>
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
        element: <ToDo />,
      },
      {
        path: "/test",
        element: <Test />,
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
