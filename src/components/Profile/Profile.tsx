import React from 'react';
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
        <div>
            <ProfileInfo userProfile={props.userProfile}
                         status={props.status}
                         updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </div>
    );
}

export default Profile;