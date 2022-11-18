import React, {Component} from "react";
import {
    followActionCreator,
    setCurrentPageActionCreator,
    setUsersActionCreator,
    setUsersTotalCountActionCreator,
    toggleIsFetchingActionCreator,
    unfollowActionCreator,
    UserType
} from "../../redux/usersPageReducer";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import axios from "axios";
import {Users} from "./Users";
import {PreloaderDog} from "../../common/preloader/PreloaderDog/PreloaderDog";


export class UsersAPIContainer extends Component<UsersPageClassPropsType> {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(res => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(res.data.items)
                this.props.setTotalUsersCount(res.data.totalCount)
            })
    }

    onPageChanged = (page: number) => {
        this.props.setCurrentPage(page)
        this.props.toggleIsFetching(true)

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
            .then(res => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(res.data.items)
            })
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
                unfollow={this.props.unfollow}
                follow={this.props.follow}

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
        isFetching: state.usersPage.isFetching
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


export type mapStateToUsersPropsType = {
    users: UserType[],
    pageSize: number,
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}
export type mapDispatchToUsersPropsType = {
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: UserType[]) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
}
export type UsersPropsType = mapStateToUsersPropsType & mapDispatchToUsersPropsType
export type UsersPageClassPropsType = Readonly<UsersPropsType>

export const UsersContainer = connect(mapStateToUsersProps, {
    follow: followActionCreator,
    unfollow:unfollowActionCreator,
    setUsers: setUsersActionCreator,
    setCurrentPage:setCurrentPageActionCreator,
    setTotalUsersCount: setUsersTotalCountActionCreator,
    toggleIsFetching: toggleIsFetchingActionCreator
    })(UsersAPIContainer)