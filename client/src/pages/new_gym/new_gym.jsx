import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from '../login/login.module.css'
import { AddGym } from '../../store/actions/gymsActions'
import { useForm } from 'react-hook-form'

const RegisterGym = () => {

    const { loading } = useSelector(
        (state) => state.auth
    )

    const { register, handleSubmit } = useForm()

    const dispatch = useDispatch()

    const submitForm = (data) => {
        let dat = dispatch(AddGym({
            name: data.name,
            country: data.country,
            city: data.city,
            address: data.address,
            login_cookie: localStorage.getItem('login_cookie'),
            auth_token: localStorage.getItem('auth_token')
        }))
        .then((dat) =>
        {
            console.log(dat)
            if (dat.payload.auth !== '0' && dat.payload.result === '1')
            {
                document.getElementById('result').innerHTML = 'added'
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
                document.getElementById('api_errs').innerHTML = 'gym already exists'
            }
        })
    }
    
    return (
        <form onSubmit={handleSubmit(submitForm)} className={s.form}>
            <span id='api_errs' className={s.error}></span>
            <div className={s.formGroup}>
                <label htmlFor='text'>
                    Gym name
                </label>
                <input 
                    type='text'
                    className={s.formInput}
                    placeholder='Enter name'
                    {...register('name')}
                    required
                />
            </div>
            <div className={s.formGroup}>
                <label htmlFor='text'>
                    country
                </label>
                <input 
                    type='text'
                    className={s.formInput}
                    placeholder='Enter country'
                    {...register('country')}
                    required
                />
            </div>
            <div className={s.formGroup}>
                <label htmlFor='text'>
                    city
                </label>
                <input 
                    type='text'
                    className={s.formInput}
                    placeholder='Enter city'
                    {...register('city')}
                    required
                />
            </div>
            <div className={s.formGroup}>
                <label htmlFor='text'>
                    address
                </label>
                <input 
                    type='text'
                    className={s.formInput}
                    placeholder='Enter address'
                    {...register('address')}
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

export default RegisterGym