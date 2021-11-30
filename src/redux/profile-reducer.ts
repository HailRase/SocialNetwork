import {ActionsTypes} from "./store";

const ADD_NEW_POST = 'ADD-NEW-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

export const addPostAC = () => {
    return {
        type: ADD_NEW_POST
    } as const
}
export const updateNewPostTextAC = (newPostText: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: newPostText
    } as const
}

export type IPostType = {
    id: number
    text: string
    likesCount: number
}
export type IProfilePageType = {
    posts: Array<IPostType>
    newPostText: string
}

let initialState: IProfilePageType = {
    posts: [
        {id: 1, text: 'Hi, how old are you?', likesCount: 10},
        {id: 2, text: 'It\'s my first post', likesCount: 15},
        {id: 3, text: 'How is your it-kamasutra?', likesCount: 20}
    ],
    newPostText: 'it-kamasutra.com'
}

const profileReducer = (state = initialState, action: ActionsTypes): IProfilePageType => {
    switch (action.type) {
        case ADD_NEW_POST:
            let newPost = {
                id: 5,
                text: state.newPostText,
                likesCount: 0
            }
            state.posts.push(newPost)
            state.newPostText = ''
            return state
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText
            return state
        default:
            return state
    }
}

export default profileReducer