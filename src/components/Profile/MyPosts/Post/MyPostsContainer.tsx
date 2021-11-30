import React from 'react';
import MyPosts from "../MyPosts";
import {addPostAC, IProfilePageType, updateNewPostTextAC} from "../../../../redux/profile-reducer";
import {connect} from "react-redux";
import {StoreType} from "../../../../redux/redux-store";
import {Dispatch} from "redux";


type MapStateToPropsType = {
    profilePage: IProfilePageType
}
type MapDispatchToPropsType = {
    addPost: () => void
    updateNewPostText: (newPostText: string) => void
}

const mapStateToProps = (state: StoreType): MapStateToPropsType => {
    return {
        profilePage: state.profilePage
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: () => {
            dispatch(addPostAC())
        },
        updateNewPostText: (newPostText: string) => {
            dispatch(updateNewPostTextAC(newPostText))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;