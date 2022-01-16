import React from 'react';
import Profile from "./Profile";
import {StoreType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus, UserProfileType} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


type MapStateToPropsType = {
    userProfile: UserProfileType | null
    status: string
    authorizedUserId: number | undefined
    isAuth: boolean
}
type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
}
type ParamsPropsType = {
    userId: string
}
export type ProfileContainerPropsType =
    MapStateToPropsType
    & MapDispatchToPropsType
    & RouteComponentProps<ParamsPropsType>


class ProfileContainer extends React.Component<ProfileContainerPropsType> {
    getProfile(){
        let userId = this.props.match.params.userId
        if (!userId ) {
            userId = this.props.authorizedUserId + ''
            if(!userId){
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(+userId)
        this.props.getStatus(+userId)
    }
    componentDidMount() {
        this.getProfile()
    }

    componentDidUpdate(prevProps: ProfileContainerPropsType) {
        if (this.props.location !== prevProps.location){
            if (this.props.authorizedUserId) {
                this.props.getUserProfile(this.props.authorizedUserId)
                this.props.getStatus(this.props.authorizedUserId)
            }
        }
    }

    render() {
        return (
            <Profile userProfile={this.props.userProfile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}/>
        )
    }
}


const mapStateToProps = (state: StoreType): MapStateToPropsType => {
    return {
        userProfile: state.profilePage.userProfile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.data?.id,
        isAuth: state.auth.isAuth
    }
}

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter
)(ProfileContainer)
