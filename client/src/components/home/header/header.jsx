import s from './header.module.css'
import mac from '../../../images/mac-main2.png'
import { Link } from 'react-scroll'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLoginTab } from '../../../store/reducers/authReducer'
import Logo from '../../logo/logo'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSigninClick = () => {
        dispatch(setLoginTab(0))
        navigate("/sign-in")
    }
    const handleSignupClick = () => {
        dispatch(setLoginTab(1))
        navigate("/sign-in")
    }
    return (
        <div className={s.header}>
            <header>
                <span className={s.logo}><Logo/></span>
                <div className={s.login}>
                    <span>
                        <button onClick={handleSigninClick}>Sign in</button>
                    </span>
                    <span>
                        <button onClick={handleSignupClick}>Sign up</button>
                    </span>
                </div>
            </header>
            <div className={s.titleWrapper}>
                <div id={s.titleWrapper}>
                    <h1 className={s.title}>
                        CRM system for sports organizations
                    </h1>
                    <h2 className={s.subtitle}>
                        Automation of accounting for the activities of fitness centers
                        and sports organizations.
                    </h2>
                </div>
                <img id={s.macImg} alt='mac' src={mac}/>
            </div>
            <Link className={s.link} to="infoCards" smooth={true}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 24 24'>
                    <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"/>
                    <path d="M12 12.586 8.707 9.293l-1.414 1.414L12 15.414l4.707-4.707-1.414-1.414L12 12.586z"/>
                </svg>
            </Link>
        </div>
    )
}

export default Header