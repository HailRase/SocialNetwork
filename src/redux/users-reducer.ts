import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const SET_FETCHING = 'SET-FETCHING'
const SET_FOLLOWING_IN_PROGRESS = 'SET-FOLLOWING-IN-PROGRESS'


export type PhotosType = {
    small: string
    large: string
}
export type LocationType = {
    country: string
    city: string
}
export type UserType = {
    id: number
    photos: PhotosType
    followed: boolean
    name: string
    status: string
    location: LocationType
}
export type UsersType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}
type ActionsTypes =
    ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof setFetching>
    | ReturnType<typeof setFollowingInProgress>

let initialState: UsersType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 8,
    isFetching: true,
    followingInProgress: []
}

const usersReducer = (state = initialState, action: ActionsTypes): UsersType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)
            }
        case SET_USERS:
            return {...state, users: [...action.users]}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}
        case SET_FETCHING:
            return {...state, isFetching: action.isFetching}
        case SET_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(u => u !== action.userId)
            }
        default:
            return state
    }
}

export const followSuccess = (userId: number) => {
    return {
        type: FOLLOW,
        userId
    } as const
}
export const unfollowSuccess = (userId: number) => {
    return {
        type: UNFOLLOW,
        userId
    } as const
}
export const setUsers = (users: Array<UserType>) => {
    return {
        type: SET_USERS,
        users
    } as const
}
export const setCurrentPage = (currentPage: number) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    } as const
}
export const setTotalUsersCount = (totalUsersCount: number) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount
    } as const
}
export const setFetching = (isFetching: boolean) => {
    return {
        type: SET_FETCHING,
        isFetching
    } as const
}
export const setFollowingInProgress = (isFetching: boolean, userId: number) => {
    return {
        type: SET_FOLLOWING_IN_PROGRESS,
        isFetching,
        userId
    } as const
}

export const requestUsers = (page: number, pageSize: number) => (dispatch: Dispatch) => {
    dispatch(setFetching(true))
    dispatch(setCurrentPage(page))
    usersAPI.getUsers(page, pageSize).then(data => {
        dispatch(setFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    })
}
export const follow = (userId: number) => (dispatch: Dispatch) => {
    dispatch(setFollowingInProgress(true, userId))
    usersAPI.follow(userId).then(data => {
        if (data.resultCode === 0) {
            dispatch(followSuccess(userId))
        }
        dispatch(setFollowingInProgress(false,userId))
    })
}
export const unfollow = (userId: number) => (dispatch: Dispatch) => {
    dispatch(setFollowingInProgress(true, userId))
    usersAPI.unfollow(userId).then(data => {
        if (data.resultCode === 0) {
            dispatch(unfollowSuccess(userId))
        }
        dispatch(setFollowingInProgress(false,userId))
    })
}

export default usersReducer