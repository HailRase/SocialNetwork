import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {StoreType} from "./redux-store";
import {stopSubmit} from "redux-form";
import {batch} from "react-redux";

const SET_AUTH_USER_DATA = 'SET-AUTH-USER-DATA'
const SET_FETCHING = 'SET-FETCHING'
const SET_USER_AUTHORIZATION = 'SET-USER-AUTHORIZATION'


export type UserDataType = {
    id: number
    email: string
    login: string
}
export type AuthUserDataType = {
    data: UserDataType | null
    isFetching: boolean
    isAuth: boolean
}

type ActionsTypes = ReturnType<typeof setAuthUserData>
    | ReturnType<typeof setFetching>
    | ReturnType<typeof setUserAuthorization>

type StopSubmitType = ReturnType<typeof stopSubmit>

let initialState: AuthUserDataType = {
    data: null,
    isFetching: true,
    isAuth: false
}

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
        default:
            return state
    }
}

export const setAuthUserData = (data: UserDataType | null) => {
    return {
        type: SET_AUTH_USER_DATA,
        data
    } as const
}
export const setFetching = (isFetching: boolean) => {
    return {
        type: SET_FETCHING,
        isFetching
    } as const
}
export const setUserAuthorization = (isAuth: boolean) => {
    return {
        type: SET_USER_AUTHORIZATION,
        isAuth
    } as const
}

export const getAuthUserData = () => (dispatch: Dispatch) => {
    return authAPI.me().then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(response.data.data))
        }
    })
}
export const login = (email: string, password: string, rememberMe: boolean, captcha?: boolean): ThunkType => (dispatch) => {
    authAPI.login(email, password, rememberMe, captcha).then(data => {
        if (data.resultCode === 0) {
            dispatch(getAuthUserData())
        }else{
            dispatch(stopSubmit('login', {_error: data.messages}))
        }
    }).catch(error => console.log(error))
}
export const logout = (): ThunkType => (dispatch) => {
    authAPI.logout().then(data => {
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null))
        }
        dispatch(setUserAuthorization(false))
    }).catch(error => console.log(error))
}


export type ThunkType = ThunkAction<void, StoreType, unknown, CommonActionType>
type CommonActionType = ActionsTypes | StopSubmitType

export default authReducer