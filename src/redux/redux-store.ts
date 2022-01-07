import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import profileReducer from "./profile-reducer";
import dialogReducer from "./dialog-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer,
    usersPage: usersReducer,
    auth: authReducer
})

export let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type StoreType = ReturnType<typeof rootReducer>