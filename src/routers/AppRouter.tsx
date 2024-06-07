import {createBrowserRouter, RouterProvider} from "react-router-dom";
import UsersPage from "../pages/UsersPage";
import RequestsPage from "../pages/RequestsPage";
import SuportPage from "../pages/SuportPage";
import MainPage from "../pages/MainPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import EditUserPage from "../pages/EditUserPage";
import RequestViewPage from "../pages/RequestViewPage";
import SupportViewPage from "../pages/SupportViewPage";

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
                    children: [
                        {
                            path: "*",
                            index: true,
                            element: <UsersPage />,
                        },
                        {
                            path: ":userId",
                            element: <EditUserPage />,
                        },
                    ],
                },
                {
                    path: "requests",
                    children: [
                        {
                            path: "*",
                            index: true,
                            element: <RequestsPage />,
                        },
                        {
                            path: ":requestId",
                            element: <RequestViewPage />,
                        },
                    ],
                },
                {
                    path: "support",
                    children: [
                        {
                            path: "*",
                            index: true,
                            element: <SuportPage />,
                        },
                        {
                            path: ":supportId",
                            element: <SupportViewPage />,
                        },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default AppRouter;
