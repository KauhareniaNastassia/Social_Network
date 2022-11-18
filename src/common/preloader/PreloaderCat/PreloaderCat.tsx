import React from 'react';
import css from "./PreloaderCat.module.css"
import preloader from "../../../assets/img/preloaderCat.png";

export const PreloaderCat = () => {
    return (
        <div className={css.preloader}>
            <img src={preloader}/>
        </div>
    )
}