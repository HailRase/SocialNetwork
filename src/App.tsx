import React from 'react';
import './App.css'
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import {Route} from 'react-router-dom';
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import {StoreType} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";


type MapStateToPropsType = {
    initialized: boolean
}
type MapDispatchToPropsType = {
    initializeApp: () => void
}

type AppPropsType = MapStateToPropsType & MapDispatchToPropsType

class App extends React.Component<AppPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div style={{borderRadius: '10px'}} className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <DialogsContainer/>}
                    />
                    <Route path='/profile/:userId?'
                           render={() => <ProfileContainer/>}
                    />
                    <Route path='/news' component={() => <News/>}/>
                    <Route path='/users' component={() => <UsersContainer/>}/>
                    <Route path='/login' component={() => <Login/>}/>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state: StoreType): MapStateToPropsType => ({
    initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App);
