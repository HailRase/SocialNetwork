import * as axios from "axios";
import {UserType} from "../redux/users-reducer";
import {UserProfileType} from "../redux/profile-reducer";


type GetUsersResponseType = {
    items: UserType[]
    totalCount: number
    error: string | null
}

export type ResponseType<D> = {
    resultCode: number
    messages: string[]
    data: D
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
    getUsers(currentPage: number = 1, pageSize: number = 20) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType<{}>>(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },
    follow(userId: number) {
        return instance.post<ResponseType<{}>>(`follow/${userId}`)
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
        return instance.put<ResponseType<{}>>(`profile/status/`, {status})
            .then(response => {
                return response.data
            })
    },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append("image", photoFile)
        return instance.put<ResponseType<ProfileResponseType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        })
            .then(response => response.data)
    },
    saveProfile(profile: any) {
        return instance.put<ResponseType<ProfileResponseType>>(`profile`, profile)
            .then(response => response.data)
    },
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string | null = null) {
        return instance.post<ResponseType<{}>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => {
                return response.data
            })
    },
    logout() {
        return instance.delete<ResponseType<{}>>(`auth/login`)
            .then(response => {
                return response.data
            })
    }
}

export const securityAPI = {
    getCaptchaURL(){
        return instance.get(`security/get-captcha-url`)
            .then(response=> response.data)
    }
}