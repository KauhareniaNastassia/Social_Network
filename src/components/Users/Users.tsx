import React, {useEffect, useState} from "react";
import css from './Users.module.scss'
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
import {useNavigate} from "react-router-dom";
import {PreloaderDog} from "../../common/preloader/PreloaderDog/PreloaderDog";
import {useDebounce} from "use-debounce";


export const Users: React.FC = () => {
    const isFetching = useAppSelector(state => state.usersPage.isFetching)
    const totalUsersCount = useAppSelector((state) => state.usersPage.totalUsersCount)
    const currentPage = useAppSelector((state) => state.usersPage.currentPage)
    const pageSize = useAppSelector((state) => state.usersPage.pageSize)
    const users = useAppSelector((state) => state.usersPage.users)
    const filter = useAppSelector(state => state.usersPage.filter)
    const followingProgress = useAppSelector(state => state.usersPage.followingInProgress)
    const dispatch = useDispatch()
    const history = useNavigate()




    const [term, setTerm] = useState<string>()
    const debouncedValue = useDebounce<string | undefined>(term, 1000)



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

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersThunkCreator(1, pageSize, filter))
    }





    useEffect(() => {
        history({
            pathname: '/users',
            search: `&term=${filter.term}&friend=${filter.term}&page=${currentPage}`
        })
    }, [filter, currentPage])//comeback after refactoring to functional components 16




    useEffect(() => {
        dispatch(getUsersThunkCreator(currentPage, pageSize, filter))
    }, [currentPage, pageSize, filter])

    return (
        <div >

            {isFetching
                ? <PreloaderDog/>
                : <div className={css.users__wrapper}>
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
                </div>}


        </div>
    )
}

