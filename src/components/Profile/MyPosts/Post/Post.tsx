import React from 'react';
import s from './Post.module.css';

type PostPropsType = {
    message: string
    likeCount: number
}

function Post(props: PostPropsType) {
    return (
        <div className={s.postContainer}>
            <img src="https://www.kinonews.ru/insimgs/2018/newsimg/newsimg83415.jpg" alt=""/>
            {props.message}
            <div>
                <span>like {props.likeCount}</span>
            </div>
        </div>
    );
}

export default Post;