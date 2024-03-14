import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from '../login/login.module.css'
import { useForm } from 'react-hook-form'
import { DeleteYourself } from '../../store/actions/authActions'

const DeleteUserByUser = () => {

    const { loading } = useSelector(
        (state) => state.auth
    )

    const { register, handleSubmit } = useForm()

    const dispatch = useDispatch()

    const submitForm = (data) => {
        data.email = data.email.toLowerCase()
        let dat = dispatch(DeleteYourself({
            email: data.email,
            password: data.password,
            login_cookie: localStorage.getItem('login_cookie'),
            auth_token: localStorage.getItem('auth_token')
        }))
        .then((dat) =>
        {
            console.log(dat)
            if (dat.payload.auth !== '0' && dat.payload.result === '1')
            {
                document.getElementById('result').innerHTML = 'deleted'
                document.getElementById('api_errs').innerHTML = ''
            }
            else if (dat.payload.auth === '0')
            {
                document.getElementById('result').innerHTML = ''
                document.getElementById('api_errs').innerHTML = 'you are not registered'
            }
            else if (dat.payload.auth !== '0' && dat.payload.result === '0')
            {
                document.getElementById('result').innerHTML = ''
                document.getElementById('api_errs').innerHTML = 'wrong password'
            }
            else if (dat.payload.auth !== '0' && dat.payload.result === '-1')
            {
                document.getElementById('result').innerHTML = ''
                document.getElementById('api_errs').innerHTML = 'email not in database'
            }
        })
    }
    return (
        <form onSubmit={handleSubmit(submitForm)} className={s.form}>
            <span id='api_errs' className={s.error}></span>
            <div className={s.formGroup}>
                <label htmlFor='email'>
                    Your Email
                </label>
                <input 
                    type='email'
                    className={s.formInput}
                    placeholder='Enter user email'
                    {...register('email')}
                    required
                />
            </div>
            <div className={s.formGroup}>
                <label htmlFor='password'>
                    Password
                </label>
                <input 
                    type='password'
                    className={s.formInput}
                    placeholder='Enter user password'
                    {...register('password')}
                    required
                />
            </div>
            <button type='submit' className={s.submitButton} disabled={loading}>
                {
                    loading ? 
                    <div className={s.loading}><div></div><div></div><div></div><div></div></div> :
                    'Submit'
                }
            </button>
            <span id='result'></span>
        </form>
    )
}

export default DeleteUserByUser
