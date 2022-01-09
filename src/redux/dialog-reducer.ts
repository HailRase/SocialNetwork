const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE'

export const addMessageAC = (message: string) => {
    return {
        type: ADD_NEW_MESSAGE,
        message
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
export type IDialogPageType = {
    dialogs: Array<IDialogType>
    messages: Array<IMessageType>
}
type ActionsTypes = ReturnType<typeof addMessageAC>

let initialState: IDialogPageType = {
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
    ]
}

const dialogReducer = (state = initialState, action: ActionsTypes): IDialogPageType => {
    switch (action.type) {
        case ADD_NEW_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: 6, text: action.message}],
            }
        default:
            return state
    }
}

export default dialogReducer