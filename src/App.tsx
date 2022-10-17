import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {Route} from "react-router-dom";
import {Care} from "./components/Care/Care";
import {Forum} from "./components/Forum/Forum";
import {Settings} from "./components/Settings/Settings";
import {StatePropsType} from "./redux/state";


type AppPropsType = {
    state: StatePropsType
}

export const App = (props: AppPropsType) => {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar friendsFromBar={props.state.sidebar.friendsFromBar}/>

            <div className='app-wrapper-content'>
                <Route path='/profile'
                       render={() => <Profile
                           posts={props.state.profilePage.posts}
                       />}/>
                <Route path='/dialogs'
                       render={() => <Dialogs
                           dialogs={props.state.dialogsPage.dialogs}
                           messages={props.state.dialogsPage.messages}
                       />}/>
                <Route path='/care' render={() => <Care/>}/>
                <Route path='/forum' render={() => <Forum/>}/>
                <Route path='/settings' render={() => <Settings/>}/>
            </div>
        </div>
    );
}



