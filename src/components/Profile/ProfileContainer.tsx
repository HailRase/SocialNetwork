import React from 'react';
import Profile from "./Profile";
import * as axios from "axios";
import {StoreType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {setUserProfile, UserProfileType} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from 'react-router-dom';

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
        axios.default.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(response => {
            this.props.setUserProfile(response.data)
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