import { ic_Back } from '@/src/Utils/svg'
import React from 'react'
import style from './back.module.css'

const Backsvg = ({ onClick, text, Svg }) => {
    return (
        <>
            <div className={style.ButtonMainDiv}>
                <div className={style.BackModel} onClick={onClick}>
                    {Svg}
                </div>
                <span className={style.ButtonText}>{text}</span>
            </div>
        </>
    )
}

export default Backsvg