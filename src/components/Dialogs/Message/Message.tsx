import React from 'react';
import s from './Message.module.css';
import {MessageType} from "../../../redux/store";

function Message(props: MessageType) {
    return (
        <div className={s.message}>
            <span >{props.text}</span>
        </div>
    )
}


export default Message;