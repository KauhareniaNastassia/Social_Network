import React from 'react';
import {Outlet} from "react-router-dom";
import {Navbar} from "../Navbar/Navbar";
import css from './Layout.module.css'

export const Layout:React.FC = () => {
    return (
        <div className={css.wrapper}>
            <div className={css.navbar}>
                <Navbar />
            </div>

            <div className={css.content}>
                <Outlet/>
            </div>
        </div>
    );
};

