import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from '../pages/MainPage';

const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: "/login",
            element: <div>Hello world!</div>,
        },
        {
            path: "/register",
            element: <div>Hello world!</div>,
        },
        {
            path: "/",
            element: <MainPage/>,
            children: [
                {
                    path: "main",
                    element: <div>Hello world!</div>,
                    index: true
                },
                {
                    path: "users",
                    element: <div>This is a User Page.</div>
                },
                {
                    path: "requests",
                    element: <div>This is a Requests Page.</div>
                },
                {
                    path: "support",
                    element: <div>This is a Support Page.</div>
                }
            ]
        }
    ]);
      
    return (
        <RouterProvider router={router} />
    );
}

export default AppRouter;