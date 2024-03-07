import { Route } from 'react-router-dom'
import Content from '../../components/home/content/content.jsx'
import Header from '../../components/home/header/header.jsx'
import s from './home.module.css'
import { connect } from 'react-redux'
import { setLoginTab } from '../../store/reducers/authReducer.js'
import { bindActionCreators } from 'redux'

const Home = () => {
    return (
        <div className={s.home}>
            <div className={s.backgroundImg} />
            <Header />
            <Content />
        </div>
    )
}

export default Home