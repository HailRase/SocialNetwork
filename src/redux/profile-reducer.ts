import {ActionsTypes, ProfilePageType} from "./state";

const ADD_NEW_POST = 'ADD-NEW-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

export const addPostActionCreator = () => {
    return {
        type: ADD_NEW_POST
    } as const
}
export const UpdateNewPostTextActionCreator = (newPostText: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: newPostText
    } as const
}

const profileReducer = (state: ProfilePageType, action: ActionsTypes) => {
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