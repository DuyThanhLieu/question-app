import { Route, Routes } from "react-router-dom";
import React from 'react';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import DashBoard from './components/Admin/Content/DashBoard';
import Login from './components/Auth/Login';
import { ToastContainer } from 'react-toastify';
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";


const NotFound = () => {
    return (
        <div className="container mt-3 alert alert-danger">
            404.Not found data with your current URL!
        </div>
    )
}
const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path="/users" element={<ListQuiz />} />

                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />} />

                <Route path="/admins" element={<Admin />} >
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                    <Route path="manage-quizzes" element={<ManageQuiz />} />

                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}
export default Layout;