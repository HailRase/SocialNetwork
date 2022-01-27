import React from 'react';
import s from './ProfileInfo.module.css';
import {UserProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatus from './ProfileStatus'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

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
        <div>
            <div className={s.descriptionBlog}>
                <img src={userProfile.photos.large}
                     style={{borderRadius: "150px"}}/>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                <span>{userProfile.fullName}</span>
                <span>{userProfile.lookingForAJob}</span>
                <span>{userProfile.lookingForAJobDescription}</span>
                <span>{userProfile.userId}</span>
            </div>
        </div>
    );
}

export default ProfileInfo;