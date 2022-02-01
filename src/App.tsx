import React, { Suspense } from 'react';
import './App.css'
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import {BrowserRouter, Route, RouteComponentProps, withRouter} from 'react-router-dom';
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import {store, StoreType} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
const DialogsContainer = React.lazy(()=> import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(()=> import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(()=> import('./components/Users/UsersContainer'));
const Login = React.lazy(()=> import('./components/Login/Login'));


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

                    <Route path='/dialogs' render={withSuspense(DialogsContainer)}
                    />
                    <Route path='/profile/:userId?'
                           render={() => <Suspense fallback={<Preloader/>}><ProfileContainer/></Suspense>}
                    />
                    <Route path='/news' component={() => <News/>}/>
                    <Route path='/users' component={withSuspense(UsersContainer)}/>
                    <Route path='/login' component={withSuspense(Login)}/>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state: StoreType): MapStateToPropsType => ({
    initialized: state.app.initialized
})

let AppContainer = withRouter<RouteComponentProps, any>(connect(mapStateToProps, {initializeApp})(App));

const SamuraiJSApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}

export default SamuraiJSApp