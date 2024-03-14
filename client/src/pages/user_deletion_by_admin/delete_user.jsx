import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from '../login/login.module.css'
import { DeleteUserByAdmin } from '../../store/actions/authActions'
import { useForm } from 'react-hook-form'

const DeleteUserAdmin = () => {

    const { loading } = useSelector(
        (state) => state.auth
    )

    const { register, handleSubmit } = useForm()

    const dispatch = useDispatch()

    const submitForm = (data) => {
        data.email = data.email.toLowerCase()
        let dat = dispatch(DeleteUserByAdmin({
            email: data.email,
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
                document.getElementById('api_errs').innerHTML = 'you are not admin'
            }
            else
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
                    User Email
                </label>
                <input 
                    type='email'
                    className={s.formInput}
                    placeholder='Enter user email'
                    {...register('email')}
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

export default DeleteUserAdmin