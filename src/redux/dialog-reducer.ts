import {ActionsTypes, DialogsPageType} from "./store";

const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

export const addMessageActionCreator = () => {
    return {
        type: ADD_NEW_MESSAGE
    } as const
}
export const updateNewMessageTextActionCreator = (newPostText: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        newText: newPostText
    } as const
}

export type IMessageType = {
    id: number
    text: string
}
export type IDialogType = {
    id: number
    name: string
}
export type IDialogsPageType = {
    dialogs: Array<IDialogType>
    messages: Array<IMessageType>
    newMessageText: string
}
let initialState: IDialogsPageType = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Yura'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'}
    ],
    messages: [
        {id: 1, text: 'Hi'},
        {id: 2, text: 'How are you?'},
        {id: 3, text: 'How is your it-kamasutra?'}
    ],
    newMessageText: 'Hi, samurai'
}

const dialogReducer = (state= initialState, action: ActionsTypes):IDialogsPageType => {
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