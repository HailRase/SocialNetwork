import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";

export type AddPostFormType = {
    newPostText: string
}

const AddPostForm = (props: InjectedFormProps<AddPostFormType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={'textarea'} name={'newPostText'} placeholder={'Enter post text..'}/>
            <button>Add post</button>
        </form>
    );
};

export default reduxForm<AddPostFormType>({form: 'profileAddPostForm'})(AddPostForm);