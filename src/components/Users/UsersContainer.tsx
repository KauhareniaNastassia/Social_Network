import React, {Component} from "react";
import {
    followActionCreator, followUsersThunkCreator,
    getUsersThunkCreator,
    setCurrentPageActionCreator, setUsersTotalCountActionCreator,
    toggleFollowingProgressActionCreator,
    unfollowActionCreator, unFollowUsersThunkCreator,
    UserType
} from "../../redux/usersPageReducer";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Users} from "./Users";
import {PreloaderDog} from "../../common/preloader/PreloaderDog/PreloaderDog";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


export class UsersAPIContainer extends Component<UsersPageClassPropsType> {

    componentDidMount() {
        this.props.getUsersTC(this.props.currentPage, this.props.pageSize)
        /*this.props.toggleIsFetching(true)
        /!* axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`,
             {
                 withCredentials: true,
                 })*!/
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
            this.props.setTotalUsersCount(data.totalCount)
        })*/
    }

    onPageChanged = (page: number) => {
        this.props.setCurrentPage(page)
        this.props.getUsersTC(page, this.props.pageSize)
        /* this.props.toggleIsFetching(true)
         /!*axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`,
             {
                 withCredentials: true,
             })*!/
         usersAPI.getUsers(page, this.props.pageSize).then(data => {
             this.props.toggleIsFetching(false)
                 this.props.setUsers(data.items)
             })*/
    }

    render() {
        return <>
            {this.props.isFetching ? <PreloaderDog/> : null}
            <Users
                users={this.props.users}
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                //unfollow={this.props.unfollow}
                //follow={this.props.follow}
                toggleFollowingProgress={this.props.toggleFollowingProgress}
                followingProgress={this.props.followingInProgress}
                unFollowUsersTC={this.props.unFollowUsersTC}
                followUsersTC={this.props.followUsersTC}
            />
        </>
    }
}

export const mapStateToUsersProps = (state: AppStateType): mapStateToUsersPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}
/*export const mapDispatchToUsersProps = (dispatch: Dispatch): mapDispatchToUsersPropsType => {
    return {
        follow: (userId: string) => {
            dispatch(followActionCreator(userId))
        },
        unfollow: (userId: string) => {
            dispatch(unfollowActionCreator(userId))
        },
        setUsers: (users: UserType[]) => {
            dispatch(setUsersActionCreator(users))
        },
        setCurrentPage: (currentPage: number) => {
            dispatch(setCurrentPageActionCreator(currentPage))
        },
        setTotalUsersCount: (totalCount: number) => {
            dispatch(setUsersTotalCountActionCreator(totalCount))
        },
        toggleIsFetching: (isFetching: boolean) => {
            dispatch(toggleIsFetchingActionCreator(isFetching))
        }
    }
}*/

export const UsersContainer = compose<React.ComponentType>(
    connect(mapStateToUsersProps, {
        follow: followActionCreator,
        unfollow: unfollowActionCreator,
        setCurrentPage: setCurrentPageActionCreator,
        toggleFollowingProgress: toggleFollowingProgressActionCreator,
        getUsersTC: getUsersThunkCreator,
        unFollowUsersTC: unFollowUsersThunkCreator,
        followUsersTC: followUsersThunkCreator
    }),
    withRouter,
    withAuthRedirect
)(UsersAPIContainer)


/*export const UsersContainer = connect(mapStateToUsersProps, {
    follow: followActionCreator,
    unfollow: unfollowActionCreator,
    setCurrentPage: setCurrentPageActionCreator,
    //setUsers: setUsersActionCreator,
    //setTotalUsersCount: setUsersTotalCountActionCreator,
    //toggleIsFetching: toggleIsFetchingActionCreator,
    toggleFollowingProgress: toggleFollowingProgressActionCreator,
    getUsersTC: getUsersThunkCreator,
    unFollowUsersTC: unFollowUsersThunkCreator,
    followUsersTC: followUsersThunkCreator
})(UsersAPIContainer)*/


//===========TYPE================

export type mapStateToUsersPropsType = {
    users: UserType[],
    pageSize: number,
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: []
}
export type mapDispatchToUsersPropsType = {
    //follow: (userId: string) => void
    //unfollow: (userId: string) => void
    //setUsers: (users: UserType[]) => void
    setCurrentPage: (currentPage: number) => void
    //setTotalUsersCount: (totalCount: number) => void
    //toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingProgress: (isFetching: boolean, userId: string) => void
    getUsersTC: (currentPage: number, pageSize: number) => void
    unFollowUsersTC: (userId: string) => void
    followUsersTC: (userId: string) => void
}
export type UsersPropsType = mapStateToUsersPropsType & mapDispatchToUsersPropsType
export type UsersPageClassPropsType = Readonly<UsersPropsType>