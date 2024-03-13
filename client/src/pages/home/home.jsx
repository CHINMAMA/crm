import Content from '../../components/home/content/content.jsx'
import Header from '../../components/home/header/header.jsx'
import s from './home.module.css'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { SERVER_URL } from '../../utils/constants'

const get_data = () => {
    fetch(`${SERVER_URL}/index`)
    .then((response) => response.json())
    .then((json) => {return json});
};

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