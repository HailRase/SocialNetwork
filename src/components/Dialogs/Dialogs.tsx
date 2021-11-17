import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {ActionsTypes, DialogsPageType} from "../../redux/state";
import {
    addMessageActionCreator,
    UpdateNewMessageTextActionCreator
} from "../../redux/dialog-reducer"


type DialogsPropsType = {
    dialogPage: DialogsPageType
    dispatch: (action: ActionsTypes) => void
}


function Dialogs(props: DialogsPropsType) {

    const addMessageOnClick = () => {
        props.dispatch(addMessageActionCreator())
    }
    const onChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let textMessage = e.currentTarget.value
        props.dispatch(UpdateNewMessageTextActionCreator(textMessage))
    }

    let dialogsElements = props.dialogPage.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messageElements = props.dialogPage.messages.map(m => <Message text={m.text} id={m.id}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messageElements}
                <div>
                    <div>
                        <textarea onChange={onChangeMessage}
                                  value={props.dialogPage.newMessageText}/>
                    </div>
                    <div>
                        <button onClick={addMessageOnClick}>
                            Add message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Dialogs;