import React, {DetailedHTMLProps, FC, InputHTMLAttributes, TextareaHTMLAttributes} from 'react';
import {WrappedFieldProps} from "redux-form/lib/Field";
import s from './Textarea.module.css'


type DefaultTextAreaPropsType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type TextareaPropsType = DefaultTextAreaPropsType & WrappedFieldProps
type InputPropsType = DefaultInputPropsType & WrappedFieldProps
type FormControlPropsType = InputPropsType & TextareaPropsType
const FormControl: FC<FormControlPropsType> = ({
                                                   input,
                                                   meta,
                                                   children,
                                                   ...restProps
                                               }) => {
    const showError = meta.touched && meta.error

    return (
        <div className={showError ? `${s.formControl} ${s.error}` : s.formControl}>
            {children}
            {showError && <span className={s.errorMessage}>{meta.error}</span>}
        </div>
    );
}
export const Textarea: FC<TextareaPropsType> = ({
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