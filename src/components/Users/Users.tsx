import React from "react";
import s from './Users.module.css'
import {UsersPropsType} from "./UsersContainer";

export const Users = (props: UsersPropsType) => {
    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZdUCUpyrZZbuYo4XKCqRT2_XnO1eTdvutOf063NzcXUMy68YX0y51Befc8gvLyr1Q_K0&usqp=CAU',
                followed: false,
                fullName: 'Yury',
                status: 'I am a boss too',
                location: {country: 'Belarus', city: 'Minsk'}
            },
            {
                id: 2,
                photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZdUCUpyrZZbuYo4XKCqRT2_XnO1eTdvutOf063NzcXUMy68YX0y51Befc8gvLyr1Q_K0&usqp=CAU',
                followed: true,
                fullName: 'Vladislav',
                status: 'I am a boss too',
                location: {country: 'Russian', city: 'Moscow'}
            },
            {
                id: 3,
                photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZdUCUpyrZZbuYo4XKCqRT2_XnO1eTdvutOf063NzcXUMy68YX0y51Befc8gvLyr1Q_K0&usqp=CAU',
                followed: false,
                fullName: 'Andrew',
                status: 'I am a boss too',
                location: {country: 'Ukraine', city: 'Kiev'}
            }
        ])
    }

    return (
        <div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photoURL} className={s.userPhoto}/>
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
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}