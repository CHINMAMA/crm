import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SignIn from './signIn/signIn'
import SignUp from './signUp/signUp'
import s from './login.module.css'
import { setLoginTab } from '../../store/reducers/authReducer'

const Login = () => {
    const loginTab = useSelector(state => state.auth.loginTab)
    const dispatch = useDispatch()
    
    const chooseTab = (loginTab) => {
        if (loginTab === 0)
            return (
                <SignIn />
            )
        return (
            <SignUp />
        )
    }

    const selectedStyle = {'border-bottom': 'solid 1px #333333'}
    return (
        <div className={s.loginPage}>
            <div className={s.loginForm}>
                <div className={s.chooseTab}>
                    <button 
                        onClick={() => dispatch(setLoginTab(0))} 
                        style={loginTab == 0 ? {
                            'border-bottom': 'solid 1px #333333',
                            'color': '#000000'
                        } : {}}
                    >Sign in</button>
                    <button 
                        onClick={() => dispatch(setLoginTab(1))} 
                        style={loginTab == 1 ? {
                            'border-bottom': 'solid 1px #333333',
                            'color': '#000000'
                        } : {}}
                    >Sign up</button>
                </div>
                { chooseTab(loginTab) }
            </div>
        </div>
    )
}

export default Login