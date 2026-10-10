import { createBrowserRouter } from "react-router"
import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register.jsx";
import Home from "./features/interview/pages/Home.jsx";
import Protected from "./features/auth/components/Protected.jsx";
import InterviewReport from "./features/interview/pages/InterviewReport.jsx";
import InterviewReports from "./features/interview/pages/InterviewReports.jsx";

const routers = createBrowserRouter([
    {
        path: "/auth/login",
        element: <Login />
    },
    {
        path: '/auth/register',
        element: <Register />
    },
    {
        path: '/home',
        element: <Protected><Home /></Protected>
    },
    {
        path: '/',
        element: <Protected><Home /></Protected>
    },
    {
        path: '#',
        element: <Protected><Register /></Protected>
    },

    {
        path: "/interview/report/:interviewId",
        element: (
            <Protected>
                <InterviewReport />
            </Protected>
        )
    },
    {
        path: "/interview/reports",
        element: (
            <Protected>
                <InterviewReports />
            </Protected>
        )
    }
])

export default routers;