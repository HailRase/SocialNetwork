import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";

const ADD_NEW_POST = 'ADD-NEW-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'


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
    userProfile: UserProfileType | null
    status: string
}
type ActionsTypes = ReturnType<typeof addPost>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>

let initialState: ProfilePageType = {
    posts: [
        {id: 1, text: 'Hi, how old are you?', likesCount: 10},
        {id: 2, text: 'It\'s my first post', likesCount: 15},
        {id: 3, text: 'How is your it-kamasutra?', likesCount: 20}
    ],
    userProfile: null,
    status: ''
}

const profileReducer = (state = initialState, action: ActionsTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_NEW_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 5, text: action.postText, likesCount: 0}]
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state
    }
}

export const addPost = (postText: string) => {
    return {
        type: ADD_NEW_POST,
        postText
    } as const
}
export const setUserProfile = (userProfile: UserProfileType) => {
    return {
        type: SET_USER_PROFILE,
        userProfile
    } as const
}
export const setStatus = (status: string ) => {
    return {
        type: SET_STATUS,
        status
    } as const
}


export const getUserProfile = (userId: number) => (dispatch: Dispatch) => {
    usersAPI.getProfile(Number(userId)).then(data => {
        dispatch(setUserProfile(data))
    })
}
export const getStatus = (userId: number) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId).then(data => {
        dispatch(setStatus(data))
    })
}
export const updateStatus = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status).then(data => {
        if (data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    })
}

export default profileReducer