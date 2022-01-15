import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControl/Textarea";
import {maxLength, required} from "../../utils/validators/validators";

export type AddMessageFormType = {
    newMessageText: string
}
const maxLength50 = maxLength(50)
const AddMessageForm = (props: InjectedFormProps<AddMessageFormType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea}
                   validate={[required, maxLength50]}
                   name={"newMessageText"}
                   placeholder={"Enter your text"}
                    style={{backgroundColor: "#a95dff", outline: "none", color: '#ecdc45'}}
            />
            <div>
                <button>
                    Add message
                </button>
            </div>
        </form>
    )
}

export default reduxForm<AddMessageFormType>({form: 'dialogAddMessageForm'})(AddMessageForm)