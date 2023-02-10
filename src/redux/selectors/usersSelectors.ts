import {AppStateType} from "../redux-store";
import {createSelector} from "reselect";

export const getUsers = (state: AppStateType) => {
    return state.usersPage.users
}

export const getUsersSelector = (state: AppStateType) => {
    return getUsers(state).filter(u => true)
}


export const getUsersSuperSelector = createSelector(
    getUsers, (users) => {
        return users.filter(u => true)
    }
)


export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}
export const getFilter = (state: AppStateType) => {
    return state.usersPage.filter
}


/*
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
}*/
