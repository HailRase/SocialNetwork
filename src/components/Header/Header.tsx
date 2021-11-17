import React from 'react';
import s from './Header.module.css';

function Header() {
    return (
        <header className={s.header}>
            <img
                src="https://static.tildacdn.com/tild3136-3538-4632-b463-653639356631/Dvh-1.gif"
                alt=""/>
        </header>
    );
}

export default Header;