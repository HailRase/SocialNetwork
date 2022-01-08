import React from 'react';
import Profile from "./Profile";
import {StoreType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {getUserProfile, UserProfileType} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


type MapStateToPropsType = {
    userProfile: UserProfileType | null
}
type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
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
            userId = '2'
        }
        this.props.getUserProfile(+userId)
    }

    render() {
        return (
            <Profile userProfile={this.props.userProfile}/>
        )
    }
}


const mapStateToProps = (state: StoreType): MapStateToPropsType => {
    return {
        userProfile: state.profilePage.userProfile,
    }
}

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {getUserProfile}),
    withRouter
)(ProfileContainer)
