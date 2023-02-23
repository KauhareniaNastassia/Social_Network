import React from 'react';
import css from './PreloaderDog.module.scss'
import preloader from "../../../assets/img/preloaderDog.png";

export const PreloaderDog = () => {
    return (
        <div className={css.preloader}>
            <img src={preloader}/>
        </div>
)
}