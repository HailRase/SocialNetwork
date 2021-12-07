import React from 'react';
import MyPosts from "../MyPosts";
import {addPost, ProfilePageType, updateNewPostText} from "../../../../redux/profile-reducer";
import {connect} from "react-redux";
import {StoreType} from "../../../../redux/redux-store";
import {Dispatch} from "redux";


type MapStateToPropsType = {
    profilePage: ProfilePageType
}
type MapDispatchToPropsType = {
    addPost: () => void
    updateNewPostText: (newPostText: string) => void
}
export type MyPostsPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: StoreType): MapStateToPropsType => {
    return {
        profilePage: state.profilePage
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: () => {
            dispatch(addPost())
        },
        updateNewPostText: (newPostText: string) => {
            dispatch(updateNewPostText(newPostText))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;