import {ActionsTypes, DialogsPageType} from "./state";

const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

export const addMessageActionCreator = () => {
    return {
        type: ADD_NEW_MESSAGE
    } as const
}
export const UpdateNewMessageTextActionCreator = (newPostText: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        newText: newPostText
    } as const
}

const dialogReducer = (state: DialogsPageType, action: ActionsTypes) => {
    switch (action.type) {
        case ADD_NEW_MESSAGE:
            let newMessage = {
                id: 6,
                text: state.newMessageText
            }
            state.messages.push(newMessage)
            state.newMessageText = ''
            return state
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newText
            return state
        default:
            return state
    }
}

export default dialogReducer