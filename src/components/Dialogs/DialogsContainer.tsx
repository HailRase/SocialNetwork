import React from 'react';
import {addMessageAC, IDialogPageType} from "../../redux/dialog-reducer"
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {StoreType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

type MapStateToPropsType = {
    dialogPage: IDialogPageType
}
type MapDispatchToPropsType = {
    addMessage: (message: string) => void
}
export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType


const mapStateToProps = (state: StoreType): MapStateToPropsType => {
    return {
        dialogPage: state.dialogPage,
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addMessage: (message) => {
            dispatch(addMessageAC(message))
        }
    }
}

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs)

