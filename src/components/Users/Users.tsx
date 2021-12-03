import React from "react";
import s from './Users.module.css'
import {UsersPropsType} from "./UsersContainer";
import * as axios from "axios";
import photo from './../../assets/images/user-man.png'

export const Users = (props: UsersPropsType) => {


    if (props.users.length === 0) {
        axios.default.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
            props.setUsers(response.data.items)
        })
    }

    return (
        <div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photos.small !== null ? u.photos.small : photo} className={s.userPhoto}/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => props.unfollow(u.id)}>UNFOLLOW</button>
                                : <button onClick={() => props.follow(u.id)}>FOLLOW</button>
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