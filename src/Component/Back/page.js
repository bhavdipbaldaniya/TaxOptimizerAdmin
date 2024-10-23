import { ic_Back } from '@/src/Utils/svg'
import React from 'react'
import style from './back.module.css'

const Back = ({ onClick, text }) => {
    return (
        <>
            <div className={style.ButtonMainDiv}>
                <div className={style.BackModel} onClick={onClick}>
                    {ic_Back.icon()}
                </div>
                <span className={style.ButtonText}>{text}</span>
            </div>
        </>
    )
}

export default Back