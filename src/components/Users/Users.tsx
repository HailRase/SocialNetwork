import React from "react";
import s from './Users.module.css'
import {UserType} from "../../redux/users-reducer";
import {Paginator} from "../common/Paginator/Paginator";
import User from "./User/User";

type UserPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onPageChanged: (p: number) => void
    isFetching: boolean
    followingInProgress: number[]
}

export const Users = ({currentPage, onPageChanged, pageSize, totalUsersCount, users, ...props}: UserPropsType) => {

    return (
        <div className={s.usersContainer}>
            <div>
                <Paginator currentPage={currentPage}
                           onPageChanged={onPageChanged}
                           pageSize={pageSize}
                           totalItemsCount={totalUsersCount}
                />
            </div>
            <div className={s.usersContainerItems}>
                {
                    users.map(u => <User key={u.id}
                                         user={u}
                                         follow={props.follow}
                                         unfollow={props.unfollow}
                                         followingInProgress={props.followingInProgress}/>)
                }
            </div>
        </div>
    )
}