import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

const ADD_NEW_POST = 'ADD-NEW-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'



export type UserProfilePhotosType = {
    small: string
    large: string
}
export type UserProfileContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type UserProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: UserProfileContactsType
    photos: UserProfilePhotosType
}
export type PostType = {
    id: number
    text: string
    likesCount: number
}
export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
    userProfile: UserProfileType | null
}
type ActionsTypes = ReturnType<typeof addPost> | ReturnType<typeof updateNewPostText> | ReturnType<typeof setUserProfile>

let initialState: ProfilePageType = {
    posts: [
        {id: 1, text: 'Hi, how old are you?', likesCount: 10},
        {id: 2, text: 'It\'s my first post', likesCount: 15},
        {id: 3, text: 'How is your it-kamasutra?', likesCount: 20}
    ],
    newPostText: 'it-kamasutra.com',
    userProfile: null
}

const profileReducer = (state = initialState, action: ActionsTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_NEW_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 5, text: state.newPostText, likesCount: 0}],
                newPostText: ''
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile
            }
        default:
            return state
    }
}

export const addPost = () => {
    return {
        type: ADD_NEW_POST
    } as const
}
export const updateNewPostText = (newPostText: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: newPostText
    } as const
}
export const setUserProfile = (userProfile: UserProfileType) => {
    return {
        type: SET_USER_PROFILE,
        userProfile
    } as const
}
export const getUserProfile = (userId: number) => (dispatch: Dispatch) => {
    usersAPI.getProfile(Number(userId)).then(data => {
        dispatch(setUserProfile(data))
    })
}
export default profileReducer