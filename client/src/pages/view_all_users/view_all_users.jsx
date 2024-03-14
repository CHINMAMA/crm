import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from '../login/login.module.css'
import { viewUsers } from '../../store/actions/authActions'

const ViewUsers = () => {
    const dispatch = useDispatch()

    let dat = dispatch(viewUsers({
        login_cookie: localStorage.getItem('login_cookie'),
        auth_token: localStorage.getItem('auth_token')
    }))
    .then((dat) =>
    {
        console.log(dat)
        if (dat.payload.auth !== '0')
        {
            if (dat.payload.users.length !== 0)
            {
                document.getElementById('user_emails').innerHTML = ''
            }
            for (var i = 0, max = dat.payload.users.length; i < max; i++) {
                document.getElementById('user_emails').innerHTML += `${dat.payload.users[i]}<br/>`
            }
        }
    })
    
    return (
        <p className={s.form} id='user_emails'>none<br/></p>
    )
}

export default ViewUsers