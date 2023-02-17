import React, {useEffect} from "react";
import css from './Users.module.css'
import {Pagination} from "../../common/Pagination/Pagination";
import {User} from "./User/User";
import {FilterType} from "../../api/usersAPI";
import {UsersSearchForm} from "../Forms/UsersSearchForm/UsersSearchForm";
import {useAppSelector} from "../../hoc/useAppSelector";
import {useDispatch} from "react-redux";
import {
    followUsersThunkCreator,
    getUsersThunkCreator,
    unFollowUsersThunkCreator,
    usersPageActions
} from "../../redux/usersPageReducer";
import {useHistory} from "react-router-dom";


export const Users: React.FC = () => {

    const totalUsersCount = useAppSelector((state) => state.usersPage.totalUsersCount)
    const currentPage = useAppSelector((state) => state.usersPage.currentPage)
    const pageSize = useAppSelector((state) => state.usersPage.pageSize)
    const users = useAppSelector((state) => state.usersPage.users)
    const filter = useAppSelector(state => state.usersPage.filter)
    const followingProgress = useAppSelector(state => state.usersPage.followingInProgress)
    const dispatch = useDispatch()
  const history = useHistory()

    const followUsers = (userId: number) => {
        dispatch(followUsersThunkCreator(userId))
    }

    const unfollowUsers = (userId: number) => {
        dispatch(unFollowUsersThunkCreator(userId))
    }

    const onPageChanged = (page: number) => {
        dispatch(usersPageActions.setCurrentPageActionCreator(page))
        dispatch(getUsersThunkCreator(page, pageSize, filter))
    }

    const  onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersThunkCreator(1, pageSize, filter))
    }


    useEffect( () => {
        history.push( {
            pathname: '/users',
            search: `&term=${filter.term}&friend=${filter.term}&page=${currentPage}`
        } )
    }, [filter, currentPage] )//comeback after refactoring to functional components 16

    useEffect(() => {

        /*const parsed = queryString.parse(history.location.search.substr(1)) as {term: string, page: string, friend: string}

        let actualPage = currentPage
        let actualFilter = filter

        if(!!parsed.page) actualPage = Number(parsed.page)
        if(!!parsed.page) actualFilter = {...actualFilter, term: parsed.term as string}

        switch (parsed.friend) {
            case 'null' :
                actualFilter = {...actualFilter, friend: null}
                break;
            case 'true' :
                actualFilter = {...actualFilter, friend: null}
                break;
            case 'false' :
                actualFilter = {...actualFilter, friend: null}
                break;
        }
        dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter))
        */

        dispatch(getUsersThunkCreator(currentPage, pageSize, filter))
    }, [])

    return (
        <div className={css.usersWrapper}>

            <UsersSearchForm onFilterChanged={onFilterChanged}/>

            <Pagination
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
            />

            <div className={css.usersBlock}>
                {users.map(user =>
                    <User
                        key={user.id}
                        user={user}
                        followingProgress={followingProgress}
                        unfollowUsers={unfollowUsers}
                        followUsers={followUsers}
                    />
                )}
            </div>
        </div>
    )
}

