import React from 'react';
import './App.css'
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import {Route} from 'react-router-dom';
import {ActionsTypes, RootStateType} from "./redux/state";


type AppPropsType = {
    state: RootStateType
    dispatch: (action: ActionsTypes) => void
}


function App(props: AppPropsType) {
    return (

        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Route path='/dialogs' render={() => <Dialogs dialogPage={props.state.dialogsPage}
                                                              dispatch={props.dispatch}
                />}/>
                <Route path='/profile'
                       render={() => <Profile profilePage={props.state.profilePage}
                                              dispatch={props.dispatch}
                       />}/>
                <Route path='/news' component={() => <News/>}/>
            </div>
        </div>

    );
}

export default App;
