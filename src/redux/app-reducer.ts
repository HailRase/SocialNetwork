import {ThunkAction} from "redux-thunk";
import {StoreType} from "./redux-store";
import {Dispatch} from "redux";
import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS'

type ActionsTypes = ReturnType<typeof initializedSuccess>

type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const initializedSuccess = () => {
  return {
      type: INITIALIZED_SUCCESS
  } as const
}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(()=>{
        dispatch(initializedSuccess())
    })
}


export type ThunkType = ThunkAction<void, StoreType, unknown, CommonActionType>
type CommonActionType = ActionsTypes

export default appReducer