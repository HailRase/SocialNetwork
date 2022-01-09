import * as axios from "axios";
import {UserType} from "../redux/users-reducer";
import {UserProfileType} from "../redux/profile-reducer";


type GetUsersResponseType = {
    items: UserType[]
    totalCount: number
    error: string | null
}
type FollowResponseType = {
    resultCode: number
    messages: Array<string>
    data: object
}
type UpdateStatusResponseType = {
    resultCode: number
    messages: string[]
    data: object
}
type AuthorizeLoginResponseType = {
    resultCode: number
    messages: string[]
    data: object
}


type ProfileResponseType = UserProfileType

const instance = axios.default.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "8c6b7133-ade3-4a94-80d1-5d19fef414f3"
    }
})


export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    unfollow(userId: number) {
        return instance.delete<FollowResponseType>(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },
    follow(userId: number) {
        return instance.post<FollowResponseType>(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },
    getProfile(userId: number) {
        console.warn('Obsolete method. Please profileAPI object.')
        return profileAPI.getProfile(userId)
    }
}
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileResponseType>(`profile/${userId}`)
            .then(response => {
                return response.data
            })
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
            .then(response => {
            return response.data
        })
    },
    updateStatus(status: string) {
        return instance.put<UpdateStatusResponseType>(`profile/status/`, {status})
            .then(response => {
            return response.data
        })
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean, captcha?: boolean) {
        return instance.post<AuthorizeLoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => {
                return response.data
            })
    }
}