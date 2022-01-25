import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {MyPostsPropsType} from "./Post/MyPostsContainer";
import AddPostForm, {AddPostFormType} from "./AddPostForm";


const MyPosts = React.memo((props: MyPostsPropsType) => {

    let postsElement = props.profilePage.posts.map(p => <Post key={p.id} message={p.text} likeCount={p.likesCount}/>)

    const onSubmitAddPost = (postText: AddPostFormType) => {
        props.addPost(postText.newPostText)
        postText.newPostText = ''
    }
    return (
        <div className={s.postsBlog}>
            <h3>My posts</h3>
            <AddPostForm onSubmit={onSubmitAddPost}/>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    );
});

export default MyPosts;