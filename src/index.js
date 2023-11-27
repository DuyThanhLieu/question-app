import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import DashBoard from './components/Admin/Content/DashBoard';
// import { Provider } from 'react-redux';
// import store from './redux/store';

ReactDOM.render(

  // <Provider store={store}>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route index element={<HomePage />} />
        <Route path="/users" element={<User />} />

      </Route>
      <Route path="/admins" element={<Admin />} >
        <Route index element={<DashBoard />} />
        <Route path="manage-users" element={<ManageUser />} />

      </Route>
    </Routes>

  </BrowserRouter>,
  document.getElementById('root'));

// </Provider >
// </React.StrictMode>

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
