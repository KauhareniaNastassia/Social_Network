import React from "react";
import {Users} from "./Users";
import {PreloaderDog} from "../../common/preloader/PreloaderDog/PreloaderDog";
import {useAppSelector} from "../../hoc/useAppSelector";


export const UsersPage: React.FC = () => {

    const isFetching = useAppSelector(state => state.usersPage.isFetching)

    return <div>
        {isFetching ? <PreloaderDog/> : null}
        <Users />
    </div>
}
