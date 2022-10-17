import React from "react";
import {FriendFromBar} from "./FriendFromBar/FriendFromBar";
import {FriendFromBarType} from "../../../redux/state";
import css from './FriendsBar.module.css'


type FriendsBarPropsType = {
    friendsFromBar: FriendFromBarType[]
}


export const FriendsBar = (props: FriendsBarPropsType) => {
    return (
        <div className={css.friendsBarWrapper}>
            { props.friendsFromBar.map( friendFromBar => <FriendFromBar friendName={friendFromBar.friendName} photo={friendFromBar.photo}/> ) }

        </div>
    )
}