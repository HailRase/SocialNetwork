import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css';
import {UserProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import photo from '../../../assets/images/user-man.png'
import {ProfileData} from './ProfileData/ProfileData';
import ProfileDataReduxForm, {ProfileFormDataType} from "./ProfileDataForm/ProfileDataForm";
import {useDispatch} from "react-redux";
import {stopSubmit} from "redux-form";

type ProfileInfoPropsType = {
    userProfile: UserProfileType | null
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    savePhoto: (photo: any) => void
    saveProfile: (profile: any) => void
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
                                                         userProfile,
                                                         isOwner,
                                                         status,
                                                         updateStatus,
                                                         savePhoto,
                                                         saveProfile
                                                     }) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const dispatch = useDispatch()
    if (!userProfile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }
    const onSubmitHandler = async (formData: ProfileFormDataType) => {
        try {
            await saveProfile(formData)
            setEditMode(false)
        }catch (error){
            dispatch(stopSubmit("edit-profile", {_error: error}))
            console.log(error)
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
            {editMode
                ? <ProfileDataReduxForm initialValues={userProfile} onSubmit={onSubmitHandler}/>
                : <ProfileData userProfile={userProfile}
                               status={status}
                               isOwner={isOwner}
                               updateStatus={updateStatus}
                               setEditMode={() => setEditMode(true)}
                />}
        </div>
    );
}


export default ProfileInfo;