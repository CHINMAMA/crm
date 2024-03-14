import 'devextreme/dist/css/dx.light.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home.jsx'
import Login from './pages/login/login.jsx';
import Dashboard from './pages/dashboard/dashboard.jsx';
import ViewUsers from './pages/view_all_users/view_all_users.jsx';
import DeleteUserAdmin from './pages/user_deletion_by_admin/delete_user.jsx';
import DeleteUserByUser from './pages/delete_yourself/delete_user.jsx';
import ViewGyms from './pages/view_gyms/view_gyms.jsx';
import RegisterGym from './pages/new_gym/new_gym.jsx';

import { useGetUserDetailsQuery } from './services/authService.js';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode'
import { setCredentials } from './store/reducers/authReducer.js';
import { useEffect } from 'react';
import Schedule from './components/dashboard/schedule/schedule.jsx';

import "core-js/stable/atob"
import { decode } from "base-64";

global.atob = decode;



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/sign-in' element={<Login/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/view-users' element={<ViewUsers/>}/>
                <Route path='/delete-by-admin' element={<DeleteUserAdmin/>}/>
                <Route path='/delete-yourself' element={<DeleteUserByUser/>}/>
                <Route path='/view-gyms' element={<ViewGyms/>}/>
                <Route path='/add-gym' element={<RegisterGym/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
