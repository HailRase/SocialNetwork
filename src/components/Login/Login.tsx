import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import s from './Login.module.css';
import {connect, useSelector} from "react-redux";
import {StoreType} from "../../redux/redux-store";
import {createField, Input} from "../common/FormsControl/FormsControl";
import {required} from "../../utils/validators/validators";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import CustomButton from "../common/CustomButton/CustomButton";

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
    error: string
}
type MapStateToPropsType = {
    isAuth: boolean
    isFetching: boolean
    captcha: string | null
}
type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}

type LoginPropsType = MapStateToPropsType & MapDispatchToPropsType

const LoginForm = ({
                       handleSubmit,
                       error,
                       captcha
                   }: InjectedFormProps<FormDataType, LoginPropsType> & LoginPropsType) => {
    return (
        <form onSubmit={handleSubmit} className={s.formElementsPosition}>
            {createField('Login', 'email', [required], Input)}
            {createField('Password', 'password', [required], Input, {type: 'password'})}
            {createField('', 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}
            {error && <div style={{color: 'red'}}>{error}</div>}
            {captcha &&
                <div className={s.captchaBlock}>
                    <img src={captcha} alt=""/>
                    {createField('captcha', 'captcha', [required], Input)}
                </div>}
            <div>
                <CustomButton purple>Login</CustomButton>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType, LoginPropsType>({form: 'login'})(LoginForm)

const mapStateToProps = (state: StoreType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        isFetching: state.auth.isFetching,
        captcha: state.auth.captcha
    }
}


const Login = (props: LoginPropsType) => {
    const onSubmitHandler = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) return <Redirect to={'/profile'}/>
    return (
        <div className={s.loginContainer}>
            <div className={s.loginElementsPosition}>
                <div>
                    <h1 className={s.formName}>LOGIN</h1>
                </div>
                <div style={{marginBottom: "10px"}}>
                    <span style={{display: "block"}}>login: free@samuraijs.com</span>
                    <span style={{display: "block"}}>password: free</span>
                </div>
                <div>
                    <LoginReduxForm onSubmit={onSubmitHandler} {...props} />
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, {login})(Login);