import React from 'react';
import Profile from "./Profile";
import {StoreType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {setUserProfile, UserProfileType} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {profileAPI} from "../../api/api";

/*type ProfilePropsType = {
    store: StoreType
}*/

type MapStateToPropsType = {
    userProfile: UserProfileType | null
}
type MapDispatchToPropsType = {
    setUserProfile: (userProfile: UserProfileType) => void
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
        if (!userId){
            userId = '2'
        }
        profileAPI.getProfile(Number(userId)).then(data => {
            this.props.setUserProfile(data)
        })
    }

    render() {
        return (
            <Profile userProfile={this.props.userProfile}/>
        )
    }
}

const mapStateToProps = (state: StoreType): MapStateToPropsType => {
    return {
        userProfile: state.profilePage.userProfile
    }
}
const WithUrlDataContainerComponent = withRouter(ProfileContainer)
export default connect(mapStateToProps, {
    setUserProfile
})(WithUrlDataContainerComponent);