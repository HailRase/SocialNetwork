import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLength, required} from "../../../utils/validators/validators";
import {FormsControl} from "../../common/FormsControl/FormsControl";
import CustomButton from "../../common/CustomButton/CustomButton";
import s from './AddPostForm.module.css'

export type AddPostFormType = {
    newPostText: string
}
const maxLength15 = maxLength(15)
const AddPostForm = (props: InjectedFormProps<AddPostFormType>) => {
    return (
        <form className={s.addPostFormContainer} onSubmit={props.handleSubmit}>
            <Field component={FormsControl}
                   label={'Create new post'}
                   name={'newPostText'}
                   placeholder={'Enter post text..'}
                   validate={[required, maxLength15]}
                   style={{width: "100%"}}
            />
            <CustomButton className={s.buttonPosition} purple>Add post</CustomButton>
        </form>
    );
};

export default reduxForm<AddPostFormType>({form: 'profileAddPostForm'})(AddPostForm);