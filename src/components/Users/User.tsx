import React from 'react';
import {NavLink} from "react-router-dom";
import photo from "../../assets/images/user-man.png";
import s from "./Users.module.css";
import {UserType} from "../../redux/users-reducer";

type UserPropsType = {
    user: UserType
    followingInProgress: number[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const User: React.FC<UserPropsType> = ({user,followingInProgress, unfollow, follow}) => {
    return (
        <div>
                    <span>
                        <div>
                            <NavLink to={`/profile/${user.id}`}>
                            <img src={user.photos.small !== null ? user.photos.small : photo} className={s.userPhoto}/>
                                </NavLink>
                        </div>
                        <div>
                            {user.followed
                                ? <button disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              unfollow(user.id)
                                          }}>UNFOLLOW</button>
                                : <button disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              follow(user.id)
                                          }}>FOLLOW</button>
                            }
                        </div>
                    </span>
            <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </span>
                    </span>
        </div>
    );
};

export default User;