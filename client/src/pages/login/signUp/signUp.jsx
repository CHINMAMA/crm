import React, { useEffect } from 'react'
import s from '../login.module.css'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../../store/actions/authActions'
import { useNavigate } from 'react-router-dom'
import { setLoginTab } from '../../../store/reducers/authReducer'

const SignUp = () => {
    const { register, handleSubmit } = useForm()

    const { loading, userInfo, error, success } = useSelector(
        (state) => state.auth
    )
    const dispatch = useDispatch()
    // const navigate = useNavigate()

    useEffect(() => {
        if (success) dispatch(setLoginTab(0))
        // if (userInfo) console.log(userInfo);
    })

    const submitForm = (data) => {
        if (data.password !== data.confirmPassword) {
            alert('Password mismatch')
            return
        }
        data.email = data.email.toLowerCase()
        dispatch(registerUser(data))
    }

    return (
        <form onSubmit={handleSubmit(submitForm)} className={s.form}>
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
                <label htmlFor='email'>
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
                <label htmlFor='confirm-password'>
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
            <button type='submit' className={s.submitButton} disabled={loading}>
                {
                    loading ? 
                    <div class={s.loading}><div></div><div></div><div></div><div></div></div> :
                    'Submit'
                }
            </button> 
        </form>
    )
}


export default SignUp