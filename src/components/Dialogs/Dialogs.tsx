import React from 'react';
import s from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {DialogsPropsType} from "./DialogsContainer";
import AddMessageForm, {AddMessageFormType} from "./AddMessageForm";


function Dialogs(props: DialogsPropsType) {

    const onSubmitAddMessage = (message: AddMessageFormType) => {
        props.addMessage(message.newMessageText)
        message.newMessageText = ''
    }
    let dialogsElements = props.dialogPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messageElements = props.dialogPage.messages.map(m => <Message key={m.id} text={m.text} id={m.id}/>)


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div>
                <div className={s.messages}>
                    {messageElements}
                </div>
                <div>
                    <AddMessageForm onSubmit={onSubmitAddMessage}/>
                </div>
            </div>
        </div>
    )

}

export default Dialogs;