import React from 'react';
import s from './ProfileInfo.module.css';
import {UserProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import photo from "../../../assets/images/user-man.png";

type ProfileInfoPropsType = {
    userProfile: UserProfileType | null
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
                                                         userProfile,
                                                         status,
                                                         updateStatus
                                                     }) => {
    if (!userProfile) {
        return <Preloader/>
    }
    return (
            <div className={s.descriptionBlog}>
                <div className={s.profileImage}>
                    {userProfile.photos.large
                        ? <img src={userProfile.photos.large}/>
                        : <div className={s.noAvatar}>No Avatar</div>}

                </div>
                <div>
                    <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                    <span>{userProfile.fullName}</span>
                    <span>{userProfile.lookingForAJob}</span>
                    <span>{userProfile.lookingForAJobDescription}</span>
                </div>
            </div>
    );
}

export default ProfileInfo;