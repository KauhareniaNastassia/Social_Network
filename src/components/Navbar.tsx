import React from "react";
import '../App.css';

export const Navbar = () => {
    return (
        <nav className="nav">
            <div> <a> My profile </a> </div>
            <div> <a> Messages </a> </div>
            <div> <a> Care </a> </div>
            <div> <a> Forum </a> </div>
            <div> <a> Settings </a> </div>
        </nav>
    )
}