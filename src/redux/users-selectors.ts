import {StoreType} from "./redux-store";
import {createSelector} from "reselect";

const getUsersSelector = (state: StoreType) => {
    return state.usersPage.users
}
export const getUsers =  createSelector( getUsersSelector, (users) => {
   return  users.filter(u => true)
})
export const getPageSize = (state: StoreType) => {
    return state.usersPage.pageSize
}
export const getCurrentPage = (state: StoreType) => {
    return state.usersPage.currentPage
}
export const getTotalUsersCount = (state: StoreType) => {
    return state.usersPage.totalUsersCount
}
export const getIsFetching = (state: StoreType) => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state: StoreType) => {
    return state.usersPage.followingInProgress
}