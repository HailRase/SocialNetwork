import React from 'react';
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/Post/MyPostsContainer";
import { UserProfileType} from "../../redux/profile-reducer";

type ProfilePropsType = {
    userProfile: UserProfileType | null
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    savePhoto: (photo: any) => void
    saveProfile: (profile: any) => void
}

function Profile(props: ProfilePropsType) {



    return (
        <div className={s.profileContainer}>
            <div className={s.profilePage}>
                <div className={s.profileInfoContainer}>
                    <ProfileInfo userProfile={props.userProfile}
                                 isOwner={props.isOwner}
                                 status={props.status}
                                 savePhoto={props.savePhoto}
                                 saveProfile={props.saveProfile}
                                 updateStatus={props.updateStatus}/>
                </div>
                <div className={s.profilePageServices}>
                    <div className={s.friendsPage}>
                        <div className={s.nameContainer}>
                            <span>Friends</span>
                        </div>

                    </div>
                    <MyPostsContainer/>
                </div>
            </div>
        </div>
    );
}

export default Profile;