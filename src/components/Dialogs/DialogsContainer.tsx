import React from 'react';
import {addMessageAC, IDialogPageType, updateNewMessageTextAC} from "../../redux/dialog-reducer"
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {StoreType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

type MapStateToPropsType = {
    dialogPage: IDialogPageType
}
type MapDispatchToPropsType = {
    addMessage: () => void
    updateNewMessageText: (textMessage: string) => void
}
export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType


const mapStateToProps = (state: StoreType): MapStateToPropsType => {
    return {
        dialogPage: state.dialogPage,
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

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs)

