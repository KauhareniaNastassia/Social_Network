import React, {useState} from "react";
import css from './Pagination.module.scss'

export const Pagination = React.memo((props: PaginatorPropsType) => {

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
                {portionNumber > 1 &&
                    <button className={css.pagination_btn} onClick={() => setPortionNumber(portionNumber - 1)}> PREV </button>
                }
            </div>


            <div className={css.pagination_pages}>
                {pages
                    .filter(page => {
                        return page >= leftPortionPageNumber && page <= rightPortionNumber
                    })
                    .map(page => {
                        return <span
                            key={page}
                            onClick={() => {
                                props.onPageChanged(page)
                            }}
                            className={props.currentPage === page ? css.selectedPage : css.page}>
                            {page} </span>
                    })}
            </div>

            <div>
                {portionCount > portionNumber &&
                    <button className={css.pagination_btn} onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>}
            </div>
        </div>

    )
})

//===========TYPE================

type PaginatorPropsType = {

    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (page: number) => void

}
