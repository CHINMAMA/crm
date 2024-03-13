import React, { useEffect, useState } from 'react'
import s from '../../../pages/login/login.module.css'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../../store/actions/authActions'
import { ApiErrs } from '../../../pages/login/login.jsx'

const SignUp = () => {
    const { register, handleSubmit } = useForm()
    const [role, setRole] = useState('GYM OWNER')
    const { loading, userInfo, error, success } = useSelector(
        (state) => state.auth
    )
    const dispatch = useDispatch()
    const submitForm = (data) => {
        if (data.password !== data.confirmPassword) {
            error = 'Password mismatch'
            return
        }
        data.email = data.email.toLowerCase()
        let dat = dispatch(registerUser(data))
        .then((dat) => {
            console.log(dat.payload)
            if (dat.payload === 'login_exists')
            {
                document.getElementById('api_errs').innerHTML = 'Email registered'
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(submitForm)} className={s.form}>
            {error && <span className={s.error}>{error}</span>}
            <span id='api_errs' className={s.error}></span>
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