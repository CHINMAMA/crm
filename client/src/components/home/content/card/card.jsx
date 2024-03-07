import s from './card.module.css'

const Card = (props) => {
    let { image, text } = props
    return (
        <div className={s.card}>
            <img src={image} alt='unlucky' />
            <div className={s.text} >
                <p>
                    {text}
                </p>
            </div>
        </div>
    )
}

export default Card