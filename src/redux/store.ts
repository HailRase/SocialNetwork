import profileReducer, {addPostActionCreator, UpdateNewPostTextActionCreator} from "./profile-reducer";
import dialogReducer, {addMessageActionCreator, UpdateNewMessageTextActionCreator} from "./dialog-reducer";



export type MessageType = {
    id: number
    text: string
}
export type DialogType = {
    id: number
    name: string
}
export type PostType = {
    id: number
    text: string
    likesCount: number
}
export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}
export type DialogsPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageText: string
}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}
export type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionsTypes) => void
}

export type ActionsTypes =
    ReturnType<typeof addPostActionCreator> |
    ReturnType<typeof UpdateNewPostTextActionCreator> |
    ReturnType<typeof addMessageActionCreator> |
    ReturnType<typeof UpdateNewMessageTextActionCreator>


let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, text: 'Hi, how old are you?', likesCount: 10},
                {id: 2, text: 'It\'s my first post', likesCount: 15},
                {id: 3, text: 'How is your it-kamasutra?', likesCount: 20}
            ],
            newPostText: 'it-kamasutra.com'
        },
        dialogsPage: {
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
        },
    },
    getState() {
        return this._state
    },
    _callSubscriber() {
        console.log('state was changed')
    },
    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogReducer(this._state.dialogsPage, action)
        this._callSubscriber()

    },
    subscribe(observer) {
        this._callSubscriber = observer
    }
}


export default store;
