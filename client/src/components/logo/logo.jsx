import React from 'react'
import s from './logo.module.css'

const Logo = ({ size }) => {
  return (
    <h1 className={s.logo} style={{fontSize: size ?? '2.4rem'}}>Herrington<span className={s.coloredText}>CRM</span></h1>
  )
}

export default Logo