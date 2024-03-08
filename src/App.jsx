import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import UserProvider from "./Context/User.context.jsx";
import Login from "./pages/Login/index.jsx";
import Signup from "./pages/Signup/index.jsx";
import ForgetPassword from "./pages/ForgetPassword/index.jsx";
import CreateNewPassword from "./pages/CreateNewPassword/index.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/index.jsx";
import Customers from "./pages/Customers/index.jsx";
import Requests from "./pages/Requests/index.jsx";
import Dashboard from "./Components/Dashboard/index.jsx";

function App() {
  const routes = createBrowserRouter([
    { path: "/", element: <Navigate replace to="/Dashboard" /> },
    {
      path: "/Dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Navigate replace to="customers" /> },
        { path: "customers", element: <Customers /> },
        { path: "requests", element: <Requests /> },
      ],
    },
    { path: "login", element: <Login /> },
    {
      path: "signup",
      element: <Signup />,
    },
    { path: "resetpassword", element: <ForgetPassword /> },
    { path: "newpassword", element: <CreateNewPassword /> },
  ]);

  return (
    <UserProvider>
      <RouterProvider router={routes}></RouterProvider>
    </UserProvider>
  );
}

export default App;
