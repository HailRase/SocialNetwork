import {combineReducers, createStore } from "redux";
import profileReducer from "./profile-reducer";
import dialogReducer from "./dialog-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogReducer
})

export let store = createStore(rootReducer)
export type StoreType = ReturnType<typeof rootReducer>