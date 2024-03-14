import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from '../login/login.module.css'
import { viewGyms } from '../../store/actions/gymsActions'

const ViewGyms = () => {
    const dispatch = useDispatch()


    let dat = dispatch(viewGyms({}))
    .then((dat) =>
    {
        if (dat.payload.gyms.length === 0)
        {
            document.getElementById('gyms_data').innerHTML = 'None'
        }
        else
        {
            document.getElementById('gyms_data').innerHTML = ''
        }
        for (var i = 0, max = dat.payload.gyms.length; i < max; i++) {
            const gym = dat.payload.gyms[i]
            document.getElementById('gyms_data').innerHTML += `${gym.name} ${gym.country} ${gym.city} ${gym.address}<br/>`
        }
    })
    
    return (
        <p className={s.form} id='gyms_data'></p>
    )
}

export default ViewGyms