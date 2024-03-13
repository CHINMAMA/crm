import React, { useCallback, useEffect, useState } from 'react'
import s from './dashboard.module.css'
import 'devextreme/dist/css/dx.light.css'
import { Scheduler } from 'devextreme-react/scheduler';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../store/reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../components/logo/logo';
import { 
    useAddAppointmentMutation,
    useDeleteAppointmentMutation,
    useGetAllGymsQuery,
    useGetAppointmentsQuery,
    useGetGymsByOwnerQuery,
    useGetGymsQuery,
    useGetTrainersQuery,
    useUpdateAppointmentMutation
} from '../../services/scheduleService';
import CustomStore from 'devextreme/data/custom_store';

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
            <header className={s.header}>
                <span className={s.logo}><Logo size='1.6rem'/></span>
                <button onClick={() => dispatch(logout())}>Logout</button>
            </header>
            <div className={s.content}>
                <aside className={s.navigation}>
                        <nav>
                            <Link to='/members'>Members</Link>
                            <Link to='/trainers'>Trainers</Link>
                            <Link to='/gyms'>Gyms</Link>
                        </nav>
                    </aside>
                <main>
                    <Outlet context={{userInfo}}/>
                </main>
            </div>
        </div>
    )
}

export default Dashboard