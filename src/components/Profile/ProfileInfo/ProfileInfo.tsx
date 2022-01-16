import React from 'react';
import s from './ProfileInfo.module.css';
import {UserProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatus from './ProfileStatus'

type ProfileInfoPropsType = {
    userProfile: UserProfileType | null
    status: string
    updateStatus: (status: string) => void
}

function ProfileInfo(props: ProfileInfoPropsType) {
    if (!props.userProfile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.descriptionBlog}>
                <img src={props.userProfile.photos.large}
                     style={{borderRadius: "150px"}}/>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
                <span>{props.userProfile.fullName}</span>
                <span>{props.userProfile.lookingForAJob}</span>
                <span>{props.userProfile.lookingForAJobDescription}</span>
                <span>{props.userProfile.userId}</span>
            </div>
        </div>
    );
}

export default ProfileInfo;