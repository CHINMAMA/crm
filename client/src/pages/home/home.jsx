import Content from '../../components/home/content/content.jsx'
import Header from '../../components/home/header/header.jsx'
import s from './home.module.css'

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