import React from "react";
import s from "../../Users/Users.module.css";

type PaginatorPropsType = {
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (p: number) => void
}

export const Paginator: React.FC<PaginatorPropsType> = ({
                                                            pageSize,
                                                            currentPage,
                                                            onPageChanged,
                                                            totalUsersCount
                                                        }) => {
    
    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pagesArray = []
    for (let i = 1; i <= pagesCount; i++) {
        pagesArray.push(i)
    }

    return (
        <div>
            {pagesArray.map(p => <span
                style={{cursor: "pointer", margin: "5px 5px"}}
                className={currentPage === p ? s.selectedPage : ''}
                onClick={() => onPageChanged(p)}
            >{p}</span>)}
        </div>
    )
}