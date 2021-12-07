import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import {UserDataType} from "../../redux/auth-reducer";

type HeaderPropsType = {
    data: UserDataType | null
    isAuth: boolean
}

function Header(props: HeaderPropsType) {
    return (
        <header className={s.header}>
            <img
                src="https://static.tildacdn.com/tild3136-3538-4632-b463-653639356631/Dvh-1.gif"
                alt=""/>
            <div className={s.loginBlock}>{props.isAuth ? props.data?.login : <NavLink to='/login'>Login</NavLink>}</div>
        </header>
    );
}

export default Header;