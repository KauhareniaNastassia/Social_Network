import React, {useEffect, useState} from "react";
import css from './UsersForNavbar.module.css'
import {SidebarUser} from "./Friend/SidebarUser";
import {useAppDispatch, useAppSelector} from "../../../hoc/useAppSelector";
import {UserType} from "../../../api/usersAPI";
import {getUsersThunkCreator} from "../../../redux/usersPageReducer";
import {sidebarUsersPageActions} from "../../../redux/sidebarPageReducer";


export const SidebarPage:React.FC = () => {
    const filter = useAppSelector(state => state.usersPage.filter)
    const pageSize = useAppSelector(state => state.usersPage.pageSize)
    const users = useAppSelector((state) => state.usersPage.users)
    const dispatch = useAppDispatch()



    const [sideBarUser, setSideBarUser] = useState<UserType>()

    useEffect( () => {
        dispatch(sidebarUsersPageActions.getSidebarUsers(users))
    }, [] )


    const usersForSideBar = users.filter(user => user.followed === true)
    let itemId = Math.floor(Math.random() * usersForSideBar.length);


    return (
        <div className={css.usersWrapper}>
            {itemId}
            {/*<SidebarUser photo={item.photos} fullName={item.name}/>*/}


            { usersForSideBar.map( user => <SidebarUser key={user.id} fullName={user.name} photo={user.photos}/> )}

        </div>
    )
}