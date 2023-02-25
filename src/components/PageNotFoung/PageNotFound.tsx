import React from 'react';
import {PreloaderCat} from "../../common/preloader/PreloaderCat/PreloaderCat";
import css from './PageNotFounf.module.scss'
import error404 from '../../assets/img/error404.svg'
import {Navigate, useNavigate} from "react-router-dom";


export const PageNotFound = () => {

    const navigate = useNavigate()
    const navigateToProfile = () => {
        navigate('/login')
    }

    return (
        <div className={css.wrapper_notFound}>
            <img src={error404} alt='error 404 img' className={css.notFound_img}/>
            <div className={css.notFound_info}>
                <button className={css.notFound_info_button} onClick={navigateToProfile}>
                    Take me away!
                </button>
            </div>
        </div>
    );
};

export default PageNotFound;