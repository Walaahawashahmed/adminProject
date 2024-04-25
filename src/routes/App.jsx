import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import UserProvider from "../Context/User.context.jsx";
import Login from "../pages/Login/login.jsx";
import Signup from "../pages/Signup/signup.jsx";
import ForgetPassword from "../pages/ForgetPassword/forgetPassword.jsx";
import CreateNewPassword from "../pages/CreateNewPassword/index.jsx";
import ProtectedRoute from "../Components/ProtectedRoute/index.jsx";
import Customers from "../pages/Customers/Customers.jsx";
import Requests from "../pages/Requests/requestes.jsx";
import Dashboard from "../Components/Dashboard/index.jsx";
import { MantineProvider } from "@mantine/core";
import RecentReviews from "../pages/Reviews/RecentReviews/RecentReviews.jsx";
import RecentBusiness from "../pages/Business/RecentBusiness/recentBusiness.jsx";




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
        { path: "reviews", element: <RecentReviews/> },
        { path: "business", element: <RecentBusiness/> },
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
    <MantineProvider>
      <Notifications />
      <UserProvider>
        <RouterProvider router={routes}></RouterProvider>
      </UserProvider>
    </MantineProvider>
  );
}

export default App;
