import React, { useCallback, useEffect, useState } from 'react'
import s from './dashboard.module.css'
import 'devextreme/dist/css/dx.light.css'
import { Scheduler } from 'devextreme-react/scheduler';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../store/reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../components/logo/logo';
import { get_dashboard_data } from '../../store/actions/authActions'
import
{
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
    const navigate = useNavigate()

    let dat = dispatch(get_dashboard_data({
        login_cookie: localStorage.getItem('login_cookie'),
        auth_token: localStorage.getItem('auth_token')
    }))
    .then((dat) =>
    {
        console.log(dat)
        if (dat.payload.auth !== '0')
        {
            document.getElementById('greeting').innerHTML=(`Welcome, ${dat.payload.user_name}`)
        }
        if (dat.payload.auth === '1' || dat.payload.auth === '0')
        {
            var TextElements = document.getElementsByClassName('admin_required');

            for (var i = 0, max = TextElements.length; i < max; i++) {
                TextElements[i].style.visibility = 'hidden';
                TextElements[i].style.z_index = -1;
                TextElements[i].style.position = 'absolute';
            }
            
        }
        else if (dat.payload.auth === '3')
        {
            var TextElements = document.getElementsByClassName('admin_required');

            for (var i = 0, max = TextElements.length; i < max; i++) {
                TextElements[i].style.visibility = 'visible';
                TextElements[i].style.z_index = 1;
                TextElements[i].style.position = 'static';
            }
        }
    })

    return (
        <div className={s.dashboard}>
            <header className={s.header}>
                <span className={s.logo}><Logo size='1.6rem'/></span>
                <button onClick={() => dispatch(logout())}>Logout</button>
            </header>
            <div className={s.content}>
                <aside className={s.navigation}>
                        <nav>
                            <Link class='admin_required'  to='/members'>Members</Link>
                            <Link class='admin_required' to='/trainers'>Trainers</Link>
                            <Link to='/gyms'>Gyms</Link>
                        </nav>
                    </aside>
                <main id='greeting'>
                    Welcome, Anonymous user
                </main>
            </div>
        </div>
    )
}

export default Dashboard