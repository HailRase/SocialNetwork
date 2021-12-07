const SET_AUTH_USER_DATA = 'SET-AUTH-USER-DATA'
const SET_FETCHING = 'SET-FETCHING'

export const setAuthUserData = (data: UserDataType) => {
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

type ActionsTypes =
    ReturnType<typeof setAuthUserData>
| ReturnType<typeof setFetching>

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
                ...action.data,
                isAuth: true
            }
        case SET_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}

export default authReducer