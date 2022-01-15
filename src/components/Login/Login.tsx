import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import s from './Login.module.css';
import {connect} from "react-redux";
import {StoreType} from "../../redux/redux-store";
import {getUserAuthorization} from "../../redux/auth-reducer";
import {Input} from "../common/FormsControl/Textarea";
import {required} from "../../utils/validators/validators";

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}
type MapStateToPropsType = {
    isAuth: boolean
    isFetching: boolean
}
type MapDispatchToPropsType = {
    getUserAuthorization: (email: string, password: string, rememberMe: boolean, captcha?: boolean) => void
}

type LoginPropsType = MapStateToPropsType & MapDispatchToPropsType

const LoginForm = (props: InjectedFormProps<FormDataType>) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.formElementsPosition}>
            <div>
                <Field name={'login'}
                       component={Input}
                       validate={[required]}
                       placeholder={'Login'}/>
            </div>
            <div>
                <Field name={'password'}
                       component={Input}
                       validate={[required]}
                       placeholder={'Password'}/>
            </div>
            <div>
                <Field component={Input} name={'rememberMe'} type={'checkbox'}/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const mapStateToProps = (state: StoreType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        isFetching: state.auth.isFetching
    }
}

const Login = (props: LoginPropsType) => {
    const onSubmitHandler = (formData: FormDataType) => {
        props.getUserAuthorization(formData.login, formData.password, formData.rememberMe)
    }
    return (
        <div className={s.loginElementsPosition}>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmitHandler}/>
        </div>
    );
};

export default connect(mapStateToProps, {getUserAuthorization})(Login);