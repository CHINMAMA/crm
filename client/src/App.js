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
import Gyms from './components/dashboard/gyms/gyms.jsx';

function App() {
    const { accessToken, userInfo } = useSelector((state) => state.auth)
    const userId = (accessToken && accessToken !== 'undefined' ? jwtDecode(accessToken) : undefined)?.sub
    const { data: userData } = useGetUserDetailsQuery(userId)
    const dispatch = useDispatch()
    useEffect(() => {
        if (userData && Object.keys(userData).length !== 0) {
            dispatch(setCredentials(userData))
        }
    }, [userData])
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/sign-in' element={<Login/>}/>
                <Route path='/dashboard/*' element={<Dashboard/>}>
                    <Route path='' element={<Schedule/>}/>
                    <Route path='gyms' element={<Gyms/>}/>
                    <Route path='trainers' element={<p>WIP</p>}/>
                    <Route path='members' element={<p>WIP</p>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
