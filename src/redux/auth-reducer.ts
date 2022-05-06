import {Dispatch} from "redux";
import {authAPI, securityAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {StoreType} from "./redux-store";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = 'auth/SET-AUTH-USER-DATA'
const SET_FETCHING = 'auth/SET-FETCHING'
const SET_USER_AUTHORIZATION = 'auth/SET-USER-AUTHORIZATION'
const SET_CAPTCHA_URL = 'auth/SET-CAPTCHA-URL'


export type UserDataType = {
    id: number
    email: string
    login: string
}
/*export type AuthUserDataType2 = {
    data: UserDataType | null
    isFetching: boolean
    isAuth: boolean
    captcha: string | null
}*/

type ActionsTypes = ReturnType<typeof setAuthUserData>
    | ReturnType<typeof setFetching>
    | ReturnType<typeof setUserAuthorization>
    | ReturnType<typeof setCaptchaURL>

type StopSubmitType = ReturnType<typeof stopSubmit>

let initialState = {
    data: null as UserDataType | null,
    isFetching: true as boolean,
    isAuth: false as boolean,
    captcha: null as string | null
}
export type AuthUserDataType = typeof initialState


const authReducer = (state = initialState, action: ActionsTypes): AuthUserDataType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                data: action.data,
                isAuth: true
            }
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_USER_AUTHORIZATION:
            return {
                ...state,
                isAuth: action.isAuth
            }
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captcha: action.captcha
            }
        default:
            return state
    }
}

export const setAuthUserData = (data: UserDataType | null) => ({type: SET_AUTH_USER_DATA, data} as const)
export const setFetching = (isFetching: boolean) => ({type: SET_FETCHING, isFetching} as const)
export const setUserAuthorization = (isAuth: boolean) => ({type: SET_USER_AUTHORIZATION, isAuth} as const)
export const setCaptchaURL = (captcha: string | null) => ({type: SET_CAPTCHA_URL, captcha} as const)


export const getAuthUserData = () => async (dispatch: Dispatch) => {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(response.data.data))
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType => async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === 0) {
        await dispatch(getAuthUserData())
        dispatch(setCaptchaURL(null))
    } else {
        if (data.resultCode === 10) {
            dispatch(getCaptcha())
        }
        dispatch(stopSubmit('login', {_error: data.messages}))
    }
}
export const logout = (): ThunkType => async (dispatch) => {
    const data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null))
    }
    dispatch(setUserAuthorization(false))
}
export const getCaptcha = (): ThunkType => async (dispatch) => {
    const captchaURL = await securityAPI.getCaptchaURL()
    dispatch(setCaptchaURL(captchaURL.url))
}

export type ThunkType = ThunkAction<void, StoreType, unknown, CommonActionType>
type CommonActionType = ActionsTypes | StopSubmitType

export default authReducer