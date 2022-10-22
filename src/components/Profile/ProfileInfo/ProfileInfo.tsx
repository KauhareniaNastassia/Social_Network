import React from "react";
import screen from "../../../assets/img/screen.png";
import css from "./ProfileInfo.module.css"

type ProfileInfoPropsType = {

}

export const ProfileInfo = (props: ProfileInfoPropsType) => {
    return (
        <div>
            <div>
               {/* <img className={css.imgScreen} src={screen}/> */}





            </div>
            <div className={css.descriptionBlock}>ava+description</div>

        </div>
    )
}