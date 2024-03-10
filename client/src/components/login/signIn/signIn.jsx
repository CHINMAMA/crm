import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import s from '../../../pages/login/login.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../../store/actions/authActions'
import { useNavigate } from 'react-router-dom'
import { useGetUserDetailsQuery } from '../../../services/authService'

const SignIn = () => {
    const { register, handleSubmit } = useForm()

    const { loading, error, userInfo } = useSelector(
        (state) => state.auth
    )
    const navigate = useNavigate()
    useEffect(() => {
        if (userInfo && Object.keys(userInfo).length !== 0) {
            navigate('/dashboard')
        }
    })
    const dispatch = useDispatch()
    const submitForm = (data) => {
        dispatch(loginUser(data))
    }
    return (
        <form onSubmit={handleSubmit(submitForm)} className={s.form}>
            {error && <span className={s.error}>{error}</span>}
            <div className={s.formGroup}>
                <label htmlFor='email'>
                    Email
                </label>
                <input 
                    type='email'
                    className={s.formInput}
                    placeholder='Enter your email'
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
                    placeholder='Enter your password'
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
        </form>
    )
}

export default SignIn