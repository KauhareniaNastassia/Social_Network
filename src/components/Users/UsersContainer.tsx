import React, {Component} from "react";
import {
    FilterType,
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
        const {currentPage, pageSize, filter} = this.props
        this.props.getUsersTC(currentPage, pageSize, filter)
    }

    onPageChanged = (page: number) => {
        const {pageSize, filter} = this.props
        this.props.setCurrentPage(page)
        this.props.getUsersTC(page, pageSize, filter)
    }

    onFilterChanged = (filter: FilterType) => {
        const {pageSize} = this.props
        this.props.getUsersTC(1, pageSize, filter)
    }// for user search button


    render() {
        return <>
            {this.props.isFetching ? <PreloaderDog/> : null}
            <Users
                users={this.props.users}
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                onFilterChanged={this.onFilterChanged}
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
        followingInProgress: state.usersPage.followingInProgress,
        filter: state.usersPage.filter
    }
}

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
    withRouter
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
    filter: FilterType
}
export type mapDispatchToUsersPropsType = {
    setCurrentPage: (currentPage: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: string) => void
    getUsersTC: (currentPage: number, pageSize: number, filter: FilterType) => void
    unFollowUsersTC: (userId: string) => void
    followUsersTC: (userId: string) => void
}
export type UsersPropsType = mapStateToUsersPropsType & mapDispatchToUsersPropsType
export type UsersPageClassPropsType = Readonly<UsersPropsType>