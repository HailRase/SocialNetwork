import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {ActionsTypes, ProfilePageType} from "../../../redux/state";
import {addPostActionCreator,UpdateNewPostTextActionCreator} from "../../../redux/profile-reducer";

type MyPostsPropsType = {
    profilePage: ProfilePageType
    dispatch: (action: ActionsTypes) => void

}


function MyPosts(props: MyPostsPropsType) {

    let postsElement = props.profilePage.posts.map(p => <Post message={p.text} likeCount={p.likesCount}/>)

    const addPostOnClick = () => {
        props.dispatch(addPostActionCreator())
    }
    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newPostText = e.currentTarget.value
        props.dispatch(UpdateNewPostTextActionCreator(newPostText))
    }

    return (
        <div className={s.postsBlog}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} value={props.profilePage.newPostText}/>
                </div>
                <div>
                    <button onClick={addPostOnClick}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    );
}

export default MyPosts;