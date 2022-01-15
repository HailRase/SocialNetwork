import React from 'react';
import s from './DialogItem.module.css';
import {NavLink} from "react-router-dom";
import {DialogType} from "../../../redux/store";

function DialogItem(props:DialogType) {
    return (
        <div className={s.dialogsItem}>
            <NavLink style={{textDecoration: "none"}} to={"/dialogs/" + props.id}>{props.name}</NavLink>
        </div>
    );
}



export default DialogItem;