import React, { useEffect } from 'react'
import s from './dashboard.module.css'
import 'devextreme/dist/css/dx.light.css'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../store/reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';


function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

const Dashboard = () => {
    const dispatch = useDispatch() 

    const { userInfo } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfo || Object.keys(userInfo).length === 0) {
            navigate('/sign-in')
        }
    }, [userInfo])
    
    return (
        <div className={s.dashboard}>
            <aside className={s.navigation}>
                <div>
                    <div id={s.logo}>
                        <h1>
                            Herrington<span className={s.coloredText}>CRM</span>
                        </h1>
                    </div>
                    <nav>
                        <Link to='/dashboard'>Schedule</Link>
                        <Link to='./gyms'>Gyms</Link>
                        {userInfo?.role === 'GYM OWNER' && <Link to='./trainers'>Trainers</Link>}
                        <Link to='./members'>Members</Link>
                    </nav>
                </div>
                <button id={s.logout} onClick={() => {
                    dispatch(logout())
                    navigate('/')
                }}>Logout</button>
            </aside>
            <main className={s.content}>
                <Outlet context={{userInfo}}/>
            </main>
        </div>
    )
}

export default Dashboard