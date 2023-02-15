import React, {useState} from "react";
import css from './Pagination.module.css'
import {UsersSearchForm} from "../../components/Forms/UsersSearchForm/UsersSearchForm";
import {FilterType} from "../../api/usersAPI";

export const Pagination = (props: UsersPropsType) => {

    let portionSize = 10

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionNumber = portionNumber * portionSize


    return (

        <div className={css.pagination}>
            <div>
                <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
            </div>
            <div>

                { portionNumber > 1 &&
                    <button onClick={() =>setPortionNumber(portionNumber - 1) }> PREV </button>
                }
                {pages
                    .filter(page => page >= leftPortionPageNumber && page <= rightPortionNumber)
                    .map(page => {
                    return <span
                        onClick={(e) => {
                            props.onPageChanged(page)
                        }}
                        className={props.currentPage === page ? css.selectedPage : ''}>
                            {page} </span>
                })}
                { portionCount > portionNumber &&
                <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>}
            </div>

        </div>

    )
}

//===========TYPE================

type UsersPropsType = {

    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (page: number) => void
    onFilterChanged: (filter: FilterType) => void
}
