import React, { useEffect, useState } from 'react'
import s from '../../../pages/login/login.module.css'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../../store/actions/authActions'
import { useNavigate } from 'react-router-dom'
import { setLoginTab } from '../../../store/reducers/authReducer'

const SignUp = () => {
    const { register, handleSubmit } = useForm()
    const [role, setRole] = useState('GYM OWNER')
    const { loading, userInfo, error, success } = useSelector(
        (state) => state.auth
    )
    const dispatch = useDispatch()
    // const navigate = useNavigate()

    const submitForm = (data) => {
        if (data.password !== data.confirmPassword) {
            error = 'Password mismatch'
            return
        }
        data.email = data.email.toLowerCase()
        dispatch(registerUser(data))
        if (success) dispatch(setLoginTab(0))
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
                    {...register('email')}
                    placeholder='Enter your email'
                    required
                />
            </div>
            <div className={s.formGroup}>
                <label htmlFor='text'>
                    First name
                </label>
                <input 
                    type='text'
                    className={s.formInput}
                    {...register('firstName')}
                    placeholder='Enter your first name'
                    required
                />
            </div>
            <div className={s.formGroup}>
                <label htmlFor='text'>
                    Last name
                </label>
                <input 
                    type='text'
                    className={s.formInput}
                    {...register('lastName')}
                    placeholder='Enter your last name'
                    required
                />
            </div>
            <div className={s.formGroup}>
                <label htmlFor='tel'>
                    Phone number
                </label>
                <input 
                    type='tel'
                    className={s.formInput}
                    {...register('phoneNumber')}
                    placeholder='Enter your phone number'
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
                    {...register('password')}
                    placeholder='Enter your password'
                    required
                />
            </div>
            <div className={s.formGroup}>
                <label htmlFor='password'>
                    Confirm password
                </label>
                <input 
                    type='password'
                    className={s.formInput}
                    {...register('confirmPassword')}
                    placeholder='Repeat your password'
                    required
                />
            </div>
            <select {...register("role")}>
                <option value="GYM OWNER">I'm gym owner</option>
                <option value="TRAINER">I'm trainer</option>
            </select>
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


export default SignUp