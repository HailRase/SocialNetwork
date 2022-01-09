import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

export type AddMessageFormType = {
    newMessageText: string
}

const AddMessageForm = (props: InjectedFormProps<AddMessageFormType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={"textarea"}
                   name={"newMessageText"}
                   placeholder={"Enter your text"}/>
            <div>
                <button>
                    Add message
                </button>
            </div>
        </form>
    )
}

export default reduxForm<AddMessageFormType>({form: 'dialogAddMessageForm'})(AddMessageForm)