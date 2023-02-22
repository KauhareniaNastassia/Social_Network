import React, {useState} from "react";
import css from './UsersForNavbar.module.css'
import {SidebarUsersPropsType} from "./SidebarPageContainer";
import {SidebarUser} from "./Friend/SidebarUser";
import {useAppSelector} from "../../../hoc/useAppSelector";
import {UserType} from "../../../api/usersAPI";


export const SidebarPage:React.FC = () => {

    const users = useAppSelector((state) => state.usersPage.users)

    const usersForSideBar = users.filter(user => user.followed)

    const [sideBarUser, setSideBarUser] = useState<UserType>()

    function randomNumberInRange(min: number, max: number) {
        //  get number between min and max
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

  /*  const handleClick = () => {
        setNum(randomNumberInRange(0, 5));
    };*/

    return (
        <div className={css.usersWrapper}>
            { users.map( user => <SidebarUser key={user.id} fullName={user.name} photo={user.photos}/> )}

        </div>
    )
}