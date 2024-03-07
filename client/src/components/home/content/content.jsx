import s from './content.module.css'
import mac from '../../../images/mac-main2.png'
import Card from './card/card.jsx'

const Content = () => {
    return (
        <div id='infoCards' className={s.infoCards}>
            <Card text='Lorem Ipsum' image={mac} />
            <Card text='Lorem Ipsum' image={mac} />
            <Card text='Lorem Ipsum' image={mac} />
            <Card text='Lorem Ipsum' image={mac} />
            <Card text='Lorem Ipsum' image={mac} />
            <Card text='Lorem Ipsum' image={mac} />
            <Card text='Lorem Ipsum' image={mac} />
            <Card text='Lorem Ipsum' image={mac} />
            <Card text='Lorem Ipsum' image={mac} />
            <Card text='Lorem Ipsum' image={mac} />
        </div>
    )
}

export default Content