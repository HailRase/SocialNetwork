import React from 'react';
import {NavLink} from "react-router-dom";
import photo from "../../../assets/images/user-man.png";
import s from "./User.module.css";
import {UserType} from "../../../redux/users-reducer";
import CustomButton from "../../common/CustomButton/CustomButton";

type UserPropsType = {
    user: UserType
    followingInProgress: number[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const User: React.FC<UserPropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div className={s.userContainer}>
            <div className={s.subscribeWithPhoto}>
                <div>
                    <NavLink to={`/profile/${user.id}`}>
                        <img src={user.photos.small !== null ? user.photos.small : photo} className={s.userPhoto}/>
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <CustomButton purple disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      unfollow(user.id)
                                  }}>UNFOLLOW</CustomButton>
                        : <CustomButton purple disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      follow(user.id)
                                  }}>FOLLOW</CustomButton>
                    }
                </div>
            </div>
            <div>
                    <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                <span>
                            <div>{"Belarus"}</div>
                            <div>{"Minsk"}</div>
                        </span>
            </div>
        </div>
    );
};

export default User;