import {createBrowserRouter, RouterProvider} from "react-router-dom";
import UsersPage from "../pages/UsersPage";
import RequestsPage from "../pages/RequestsPage";
import SuportPage from "../pages/SuportPage";
import MainPage from "../pages/MainPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/register",
            element: <RegisterPage />,
        },
        {
            path: "/",
            element: <MainPage />,
            children: [
                {
                    path: "main",
                    element: <HomePage />,
                    // TODO: Разобраться с индексом.
                    index: true,
                },
                {
                    path: "users",
                    element: <UsersPage />,
                },
                {
                    path: "requests",
                    element: <RequestsPage />,
                },
                {
                    path: "support",
                    element: <SuportPage />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default AppRouter;
