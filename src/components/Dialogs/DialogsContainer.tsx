import React from 'react';
import {addMessageAC, IDialogsPageType, updateNewMessageTextAC} from "../../redux/dialog-reducer"
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {StoreType} from "../../redux/redux-store";
import {Dispatch} from "redux";

type MapStateToPropsType = {
    dialogsPage: IDialogsPageType
}
type MapDispatchToPropsType = {
    addMessage: () => void
    updateNewMessageText: (textMessage: string) => void
}

const mapStateToProps = (state: StoreType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addMessage: () => {
            dispatch(addMessageAC())
        },
        updateNewMessageText: (textMessage: string) => {
            dispatch(updateNewMessageTextAC(textMessage))
        }
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

