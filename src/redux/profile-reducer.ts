import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";

const ADD_NEW_POST = 'ADD-NEW-POST'
const DELETE_POST = 'DELETE-POST'
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
    | ReturnType<typeof deletePost>

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
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
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
export const deletePost = (postId: number) => {
    return {
        type: DELETE_POST,
        postId
    } as const
}
export const setUserProfile = (userProfile: UserProfileType) => {
    return {
        type: SET_USER_PROFILE,
        userProfile
    } as const
}
export const setStatus = (status: string) => {
    return {
        type: SET_STATUS,
        status
    } as const
}


export const getUserProfile = (userId: number) => async (dispatch: Dispatch) => {
    let data = await usersAPI.getProfile(Number(userId))
    dispatch(setUserProfile(data))
}
export const getStatus = (userId: number) => async (dispatch: Dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data))
}
export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export default profileReducer