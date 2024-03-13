import 'devextreme/dist/css/dx.light.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home.jsx'
import Login from './pages/login/login.jsx';
import Dashboard from './pages/dashboard/dashboard.jsx';
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
                <Route path='/dashboard' element={<Dashboard/>}>
                   <Route path='' element={<Schedule/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
