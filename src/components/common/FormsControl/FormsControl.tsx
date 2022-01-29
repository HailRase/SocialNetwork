import React, {DetailedHTMLProps, FC, InputHTMLAttributes, TextareaHTMLAttributes} from 'react';
import {WrappedFieldProps} from "redux-form/lib/Field";
import s from './FormsControl.module.css'
import {Field} from "redux-form";
import {required} from "../../../utils/validators/validators";

type DefaultTextAreaPropsType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type TextareaPropsType = DefaultTextAreaPropsType & WrappedFieldProps
type InputPropsType = DefaultInputPropsType & WrappedFieldProps
type FormControlPropsType = InputPropsType & TextareaPropsType
const FormControl: FC<FormControlPropsType> = ({
                                                   input,
                                                   meta: {touched, error},
                                                   children
                                               }) => {
    const showError = touched && error

    return (
        <div className={showError ? `${s.formControl} ${s.error}` : s.formControl}>
            {children}
            {showError && <span className={s.errorMessage}>{error}</span>}
        </div>
    );
}
export const FormsControl: FC<TextareaPropsType> = ({
                                                        input,
                                                        meta,
                                                        ...restProps
                                                    }) => {
    return (
        <FormControl input={input} meta={meta}>
            <textarea className={s.textarea} {...input} {...restProps}/>
        </FormControl>
    );
};

export const Input: FC<InputPropsType> = ({
                                              input,
                                              meta,
                                              ...restProps
                                          }) => {
    return (
        <FormControl input={input} meta={meta}>
            <input className={s.input} {...input} {...restProps}/>
        </FormControl>
    );
};

export const createField = <T, C, P>(placeholder?: string, name?: string, validators?: T | Array<T>, component?: C, props?: P, text?: string) => (
    <div style={{display: "flex"}}>
        <Field name={name}
               component={component}
               validate={validators}
               placeholder={placeholder}
               {...props}
            style={{marginBottom: "10px"}}
        />
        <div>
            {text}
        </div>
    </div>
)