import {createBrowserRouter, RouterProvider} from "react-router-dom";
import UsersPage from "../pages/UsersPage";
import RequestsPage from "../pages/RequestsPage";
import SuportPage from "../pages/SuportPage";
import MainPage from "../pages/MainPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";

const AppRouter = () => {
    // TODO: Сверстать страницу для ошибки.

    const router = createBrowserRouter([
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/error",
            element: <div>Error</div>,
        },
        {
            path: "/",
            element: <MainPage />,
            children: [
                {
                    path: "main",
                    index: true,
                    element: <HomePage />,
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
