import React from "react";
import '../App.css';
import screen from "../assets/img/screen.png";

export const Profile = () => {
    return (
        <div className="content">
            <img src={screen}/>
            <div>ava+description</div>
            <div>
                My posts
                <div>
                    New post
                    <div> Post 1 </div>
                    <div> Post 2 </div>
                </div>
            </div>

        </div>
    )
}