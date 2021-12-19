import React, {useState} from "react";
import s from "./Users.module.css";
import photo from "../../assets/images/user-man.png";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import * as axios from "axios";
import {followAPI} from "../../api/api";

type UserPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onPageChanged: (p: number) => void
    isFetching: boolean
}

export const Users = (props: UserPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pagesArray = []
    for (let i = 1; i <= pagesCount; i++) {
        pagesArray.push(i)
    }

    return (
        <div>
            <div>
                {pagesArray.map(p => <span
                    style={{cursor: "pointer", margin: "5px 5px"}}
                    className={props.currentPage === p ? s.selectedPage : ''}
                    onClick={() => props.onPageChanged(p)}
                >{p}</span>)}
            </div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={`/profile/${u.id}`}>
                            <img src={u.photos.small !== null ? u.photos.small : photo} className={s.userPhoto}/>
                                </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    followAPI.deleteFollow(u.id)
                                        .then(data => {
                                        if (data.resultCode === 0) {
                                            props.unfollow(u.id)
                                        }
                                    })
                                }}>UNFOLLOW</button>
                                : <button onClick={() => {
                                    followAPI.postFollow(u.id).then(data => {
                                        if (data.resultCode === 0) {
                                            props.follow(u.id)
                                        }
                                    })
                                }
                                }>FOLLOW</button>
                            }
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}