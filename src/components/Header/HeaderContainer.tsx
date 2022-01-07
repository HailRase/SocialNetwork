import React from 'react';
import Header from "./Header";
import {getAuthUserData, setFetching, UserDataType} from "../../redux/auth-reducer";
import {connect} from 'react-redux';
import {StoreType} from "../../redux/redux-store";


type MapStateToPropsType = {
    data: UserDataType | null
    isFetching: boolean
    isAuth: boolean
}
type MapDispatchToPropsType = {
    getAuthUserData: () => void
    setFetching: (isFetching: boolean) => void
}
type HeaderContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {
        this.props.getAuthUserData()
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
    getAuthUserData,
    setFetching
})(HeaderContainer);