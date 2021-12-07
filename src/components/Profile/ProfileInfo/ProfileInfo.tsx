import React from 'react';
import s from './ProfileInfo.module.css';
import {UserProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";

type ProfileInfoPropsType = {
    userProfile: UserProfileType | null
}

function ProfileInfo(props: ProfileInfoPropsType) {
    if (!props.userProfile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img
                    src="https://sebweo.com/wp-content/uploads/2019/06/landshaft-bernskikh-alp-v-yasniy-den_thumb.jpg"
                    alt=""/>
            </div>
            <div className={s.descriptionBlog}>
                <img src={props.userProfile.photos.large}
                     style={{borderRadius: "150px"}}/>
                <span>{props.userProfile.lookingForAJobDescription}</span>
            </div>
        </div>
    );
}

export default ProfileInfo;