import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

function Navbar() {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile" >Profile</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/dialogs" >Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/users" >Users</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/news" >News</NavLink>
            </div>
            <div className={s.item}>
                <a>Music</a>
            </div>
            <div className={s.item}>
                <a>Settings</a>
            </div>
            <div className={s.item}>
                <NavLink to="/friends" activeClassName={s.activeLink}><h2>Friends</h2></NavLink>
            </div>
        </nav>
    );
}

export default Navbar;