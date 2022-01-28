import React, {useEffect, useState} from "react";
import s from './Paginator.module.css'


type PaginatorPropsType = {
    pageSize: number
    totalItemsCount: number
    currentPage: number
    onPageChanged: (p: number) => void
    portionSize?: number
}

export const Paginator: React.FC<PaginatorPropsType> = ({
                                                            pageSize,
                                                            currentPage,
                                                            onPageChanged,
                                                            totalItemsCount,
                                                            portionSize = 10
                                                        }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pagesArray = []
    for (let i = 1; i <= pagesCount; i++) {
        pagesArray.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState<number>(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize
    useEffect(() => {
        setPortionNumber(Math.ceil(currentPage / portionSize))
    }, [currentPage])

    return (
        <div className={s.mainPaginator}>
            {portionNumber > 2 &&
                <button className={s.arrow} onClick={()=> setPortionNumber(1)}>{"<<"}</button>}
            {portionNumber > 1 &&
                <button className={s.arrow} onClick={()=> setPortionNumber(portionNumber - 1)}>{"<"}</button>}
            {pagesArray
                .filter(p => p >= leftPortionPageNumber && p<= rightPortionPageNumber)
                .map( p => {
                    return <span className={s.paginatorItem} onClick={() => onPageChanged(p)}>{p} </span>
                })}

            {portionCount > portionNumber &&
                <button className={s.arrow} onClick={ () => setPortionNumber(portionNumber + 1)}>{">"}</button>}
            {(portionCount - portionNumber) > 2 &&
                <button className={s.arrow} onClick={ () => setPortionNumber(portionCount)}>{">>"}</button>}
        </div>
    )
}