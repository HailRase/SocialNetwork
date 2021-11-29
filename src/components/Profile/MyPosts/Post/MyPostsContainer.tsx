import React from 'react';
import MyPosts from "../MyPosts";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../../redux/profile-reducer";
import {StoreType} from "../../../../redux/store";

type MyPostsContainerPropsType = {
    store: StoreType

}


function MyPostsContainer(props: MyPostsContainerPropsType) {

    let state = props.store.getState()

    const addPost = () => {
        props.store.dispatch(addPostActionCreator())
    }
    const onPostChange = (newPostText: string) => {
        props.store.dispatch(updateNewPostTextActionCreator(newPostText))
    }

    return (
        <MyPosts profilePage={state.profilePage} updateNewPostText={onPostChange} addPost={addPost}/>
    );
}

export default MyPostsContainer;