import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css';
import {UserProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import photo from '../../../assets/images/user-man.png'

type ProfileInfoPropsType = {
    userProfile: UserProfileType | null
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    savePhoto: (photo: any) => void
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
                                                         userProfile,
                                                         isOwner,
                                                         status,
                                                         updateStatus,
                                                         savePhoto,
                                                     }) => {
    if (!userProfile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }
    return (
        <div className={s.descriptionBlog}>
            <div className={s.profileImage}>
                <img alt={'Avatar'} src={userProfile.photos.large || photo} className={s.avatar}/>
                {isOwner &&
                    <label className={s.imageDownloader}>Upload image
                        <input type="file" onChange={onMainPhotoSelected} style={{display: "none"}}/>
                    </label>}
            </div>
            <div className={s.profileInformation}>
                <div className={s.informationItem}>
                    <span>{userProfile.fullName}</span>
                </div>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                {userProfile.lookingForAJob && <div className={s.informationItem}>
                    <span>{userProfile.lookingForAJob}</span>
                </div>}
                { userProfile.lookingForAJobDescription && <div className={s.informationItem}>
                    <span>{userProfile.lookingForAJobDescription}</span>
                </div>}
            </div>
        </div>
    );
}

export default ProfileInfo;