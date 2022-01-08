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

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '21094'
        }
        this.props.getUserProfile(+userId)
        this.props.getStatus(+userId)
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
        status: state.profilePage.status
    }
}

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter
)(ProfileContainer)
