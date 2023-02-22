import React, {useState} from "react";
import css from './UsersForNavbar.module.css'
import {SidebarUser} from "./Friend/SidebarUser";
import {useAppSelector} from "../../../hoc/useAppSelector";
import {UserType} from "../../../api/usersAPI";


export const SidebarPage:React.FC = () => {

    const users = useAppSelector((state) => state.usersPage.users)



    const [sideBarUser, setSideBarUser] = useState<UserType>()

   /* function randomNumberInRange(min: number, max: number) {
        //  get number between min and max
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    const usersForSideBar = users.filter(user => user.followed)
    let item = usersForSideBar[Math.floor(Math.random() * usersForSideBar.length)];*/



    return (
        <div className={css.usersWrapper}>

            {/*<SidebarUser photo={item.photos} fullName={item.name}/>*/}
            { users.map( user => <SidebarUser key={user.id} fullName={user.name} photo={user.photos}/> )}

        </div>
    )
}