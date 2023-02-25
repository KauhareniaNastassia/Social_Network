import React, {useEffect} from "react";
import css from './Users.module.scss'
import {Pagination} from "../../common/Pagination/Pagination";
import {User} from "./User/User";
import {FilterType} from "../../api/usersAPI";
import {UsersSearchForm} from "../Forms/UsersSearchForm/UsersSearchForm";
import {useAppSelector} from "../../hoc/useAppSelector";
import {useDispatch} from "react-redux";
import {followUsersThunkCreator, getUsersThunkCreator, unFollowUsersThunkCreator} from "../../redux/usersPageReducer";
import {useLocation, useNavigate} from "react-router-dom";
import {PreloaderDog} from "../../common/preloader/PreloaderDog/PreloaderDog";


export const Users: React.FC = () => {
    const isFetching = useAppSelector(state => state.usersPage.isFetching)
    const totalUsersCount = useAppSelector(state => state.usersPage.totalUsersCount)
    const currentPage = useAppSelector(state => state.usersPage.currentPage)
    const pageSize = useAppSelector(state => state.usersPage.pageSize)
    const users = useAppSelector(state => state.usersPage.users)
    const filter = useAppSelector(state => state.usersPage.filter)
    const followingProgress = useAppSelector(state => state.usersPage.followingInProgress)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()


    const followUsers = (userId: number) => {
        dispatch(followUsersThunkCreator(userId))
    }

    const unfollowUsers = (userId: number) => {
        dispatch(unFollowUsersThunkCreator(userId))
    }

    const onPageChanged = (page: number) => {
        /*dispatch(usersPageActions.setCurrentPageActionCreator(page))*/
        console.log('new page', page)
        dispatch(getUsersThunkCreator(page, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersThunkCreator(1, pageSize, filter))
    }

    useEffect(() => {

        /*const parsed = queryString.parse(location.search.substr(1)) as {term: string, page: string, friend: string}

        let actualPage = currentPage
        let actualFilter = filter

        if(!!parsed.page) actualPage = Number(parsed.page)
        if(!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        switch(parsed.friend) {
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break;
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break;
            case 'false':
                actualFilter = {...actualFilter, friend: false}
                break;
        }*/

        dispatch(getUsersThunkCreator(currentPage, pageSize, filter))
        console.log('current', currentPage)

    }, [])


    useEffect(() => {
        navigate({
            pathname: '/users',
            search: `&term=${filter.term}&friend=${filter.term}&page=${currentPage}`
        })
        console.log(filter)

    }, [filter, currentPage])//comeback after refactoring to functional components 16



    return (
        <div>
            {isFetching ? <PreloaderDog /> : null}

            <div className={css.users__wrapper}>
                    <div>
                        <UsersSearchForm
                            onFilterChanged={onFilterChanged}/>
                    </div>

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

                    <div>
                        <Pagination
                            totalUsersCount={totalUsersCount}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChanged={onPageChanged}
                        />
                    </div>
                </div>
        </div>
    )
}

