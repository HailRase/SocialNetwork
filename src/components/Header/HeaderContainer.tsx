import React from 'react';
import Header from "./Header";
import {logout, setFetching, UserDataType} from "../../redux/auth-reducer";
import {connect} from 'react-redux';
import {StoreType} from "../../redux/redux-store";


type MapStateToPropsType = {
    data: UserDataType | null
    isFetching: boolean
    isAuth: boolean
}
type MapDispatchToPropsType = {
    setFetching: (isFetching: boolean) => void
    logout: () => void
}
type HeaderContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderContainerPropsType> {


    render() {
        return <Header data={this.props.data} isAuth={this.props.isAuth} logout={this.props.logout}/>
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
    setFetching,
    logout
})(HeaderContainer);