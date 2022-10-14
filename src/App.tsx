import React from 'react';
import './App.css';
import {Header} from "./components/Header";
import screen from './assets/img/screen.png'
import {Navbar} from "./components/Navbar";
import {Profile} from "./components/Profile";

export const App = () => {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar />
            <Profile />
        </div>
    );
}



