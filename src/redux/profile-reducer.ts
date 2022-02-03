import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";
import {StoreType} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {stopSubmit} from "redux-form";
import {FormAction} from "redux-form/lib/actions";

const ADD_NEW_POST = 'profile/ADD-NEW-POST'
const DELETE_POST = 'profile/DELETE-POST'
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE'
const SET_STATUS = 'profile/SET-STATUS'
const SAVE_PHOTO_SUCCESS = 'profile/SAVE-PHOTO-SUCCESS'
const SAVE_PROFILE_SUCCESS = 'profile/SAVE-PROFILE-SUCCESS'


export type UserProfilePhotosType = {
    small: string
    large: string
}

export type KeysType = 'github' | 'vk' | 'facebook' | 'instagram' | 'twitter' | 'website' | 'youtube' | 'mainLink'

export type UserProfileContactsType = {
    [key: string]: string
}
export type UserProfileType = {
    userId: number
    aboutMe: string
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
    | ReturnType<typeof savePhotoSuccess>
    | ReturnType<typeof saveProfileSuccess>

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
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                //@ts-ignore
                userProfile: {...state.userProfile, photos: action.photos}
            }
        case SAVE_PROFILE_SUCCESS:
            return {
                ...state,
                //@ts-ignore
                userProfile: {...state.userProfile, fullName: action.profileData.fullName }
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
export const savePhotoSuccess = (photos: any) => ({type: SAVE_PHOTO_SUCCESS, photos} as const)
export const saveProfileSuccess = (profileData: any) => ({type: SAVE_PROFILE_SUCCESS, profileData} as const)




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
export const savePhoto = (photo: any) => async (dispatch: Dispatch) => {
    let data = await profileAPI.savePhoto(photo)
    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos))
    }
}
export const saveProfile = (profile: any):ThunkType => async (dispatch, getState: () => StoreType) => {
    const userId = getState().auth.data?.id

    let data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0 && userId) {
        dispatch(getUserProfile(userId))
    }else {
        //@ts-ignore
        dispatch(stopSubmit("edit-profile", {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}
type ThunkType = ThunkAction<void, StoreType, unknown, ActionsTypes>
/*type CommonActions = ActionsTypes & FormAction*/
export default profileReducer