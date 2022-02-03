import React from 'react';
import s from "./ProfileData.module.css";
import ProfileStatusWithHooks from "../ProfileStatusWithHooks";
import {Contact} from "../Contact/Contact";
import {UserProfileType} from "../../../../redux/profile-reducer";
import CustomButton from "../../../common/CustomButton/CustomButton";

type ProfileDataPropsType = {
    userProfile: UserProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    setEditMode: () => void
}
export const ProfileData: React.FC<ProfileDataPropsType> = ({
                                                                userProfile,
                                                                status,
                                                                updateStatus,
                                                                isOwner,
                                                                setEditMode
                                                            }) => {

    return (
        <div className={s.profileInformation}>
            <div className={s.informationItem}>
                <span><b>My name</b>: {userProfile?.fullName}</span>
            </div>
            <div className={s.informationItem}>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
            <div className={s.informationItem}>
                <span><b>Looking for a job</b>: {userProfile?.lookingForAJob ? "Yes" : "No"}</span>
            </div>
            {userProfile?.lookingForAJobDescription && <div className={s.informationItem}>
                <span><b>My professional skills</b>: {userProfile.lookingForAJobDescription}</span>
            </div>}
            <div className={s.informationItem}>
                <b>About me</b>: {userProfile?.aboutMe}
            </div>
            <div className={s.contactsContainer}>
                <div><b>Contacts</b>:</div>
                {userProfile && <div className={s.contactsItems}>{Object.keys(userProfile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={userProfile.contacts[key]}/>
                })}</div>}
            </div>
            <div className={s.buttonPosition}>
                {isOwner && <CustomButton  onClick={setEditMode} purple>Edit profile</CustomButton>}
            </div>
        </div>
    );
};
