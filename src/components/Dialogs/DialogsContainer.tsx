import React from 'react';
import {StoreType} from "../../redux/store";
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialog-reducer"
import Dialogs from "./Dialogs";


type DialogsPropsType = {
    store: StoreType
}


function DialogsContainer(props: DialogsPropsType) {

    let state = props.store.getState()

    const addMessage = () => {
        props.store.dispatch(addMessageActionCreator())
    }
    const onChangeMessage = (textMessage: string) => {
        props.store.dispatch(updateNewMessageTextActionCreator(textMessage))
    }


    return (
        <Dialogs dialogPage={state.dialogsPage} addMessage={addMessage} updateNewMessageText={onChangeMessage} />
    )

}

export default DialogsContainer;