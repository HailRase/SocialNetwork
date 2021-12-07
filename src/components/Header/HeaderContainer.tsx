import React from 'react';
import Header from "./Header";
import {setFetching, setAuthUserData, UserDataType} from "../../redux/auth-reducer";
import * as axios from "axios";
import { connect } from 'react-redux';
import {StoreType} from "../../redux/redux-store";



type MapStateToPropsType = {
    data: UserDataType | null
    isFetching: boolean
    isAuth: boolean
}
type MapDispatchToPropsType = {
    setAuthUserData: (data: UserDataType) => void
    setFetching: (isFetching: boolean) => void
}
type HeaderContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderContainerPropsType>{
    componentDidMount() {
        this.props.setFetching(true)
        axios.default.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        }).then(response => {
            if (response.data.resultCode === 0) {
                this.props.setFetching(false)
                this.props.setAuthUserData(response.data.data)
            }
        })
    }

    render() {
        return <Header data={this.props.data} isAuth={this.props.isAuth}/>
    }
}
const mapStateToProps = (state: StoreType) => {
    return {
        data: state.auth.data,
        isFetching: state.auth.isFetching,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {
    setAuthUserData,
    setFetching
})(HeaderContainer);