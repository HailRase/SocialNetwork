import React from 'react';
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/Post/MyPostsContainer";
import {UserProfileType} from "../../redux/profile-reducer";

type ProfilePropsType = {
    userProfile: UserProfileType | null
    status: string
    updateStatus: (status: string) => void
}

function Profile(props: ProfilePropsType) {



    return (
        <div className={s.profileContainer}>
            <div className={s.profilePage}>
                <div className={s.profileInfoContainer}>
                    <ProfileInfo userProfile={props.userProfile}
                                 status={props.status}
                                 updateStatus={props.updateStatus}/>
                </div>
                <div className={s.profilePageServices}>
                    <div className={s.friendsPage}>Friends</div>
                    <MyPostsContainer/>
                </div>
            </div>
        </div>
    );
}

export default Profile;