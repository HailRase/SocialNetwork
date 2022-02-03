import React from 'react';
import {UserProfileType} from "../../../../redux/profile-reducer";
import s from "./ProfileDataForm.module.css";
import {Contact} from "../Contact/Contact";
import CustomButton from "../../../common/CustomButton/CustomButton";
import {createField, FormsControl, Input} from '../../../common/FormsControl/FormsControl';
import {InjectedFormProps, reduxForm} from "redux-form";
import {useSelector} from "react-redux";
import {StoreType} from "../../../../redux/redux-store";

export type ProfileFormDataType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
}
const ProfileDataForm: React.FC<InjectedFormProps<ProfileFormDataType>> = ({handleSubmit, error}) => {
    const userProfile = useSelector<StoreType, UserProfileType | null>(state => state.profilePage.userProfile)
    return (
        <div className={s.profileDataFormControlContainer}>
            <form onSubmit={handleSubmit}>
                {error && <div style={{fontSize: "36px", color: "red"}}>{error}</div>}
                <div className={s.profileDataFormControlItem}>
                    <b>Full name:</b> {createField("Full name...", "fullName", [], Input)}
                </div>
                <div className={s.profileDataFormControlItem}>
                    <b>Looking for a job:</b>
                    {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
                </div>
                <div className={s.profileDataFormControlItem}>
                    <b>My professional skills:</b>
                    {createField("My professional skills", "lookingForAJobDescription", [], FormsControl)}
                </div>
                <div className={s.profileDataFormControlItem}>
                    <b>About me:</b>
                    {createField("About me", "aboutMe", [], FormsControl)}
                </div>
                <div className={s.contactsContainer}>
                <div><b>Contacts</b>:</div>
                 { userProfile && <div className={s.contactsItems}>{Object.keys(userProfile.contacts).map(key => {
                    return <div key={key} className={s.contactsItem}>
                        <b>{key}</b>: {createField(key, "contacts." + key, [], Input)}
                    </div>
                })}</div>}
            </div>
                <div className={s.buttonPosition}>
                    <CustomButton purple >Save</CustomButton>
                </div>
            </form>
        </div>
    );
};



export default reduxForm<ProfileFormDataType>({form: 'edit-profile'})(ProfileDataForm);