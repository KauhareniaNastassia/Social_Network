import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Route, Switch} from 'react-router-dom'
import {Care} from "./components/Care/Care";
import {Forum} from "./components/Forum/Forum";
import {Settings} from "./components/Settings/Settings";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {UsersContainer} from "./components/Users/UsersContainer";
import {ProfileContainer} from "./components/Profile/ProfileContainer";


export const App = () => {

    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>


            <div className='app-wrapper-content'>
                <Switch>
                    <Route path='/profile/:userId?'
                           render={() => <ProfileContainer
                           />}/>

                    <Route path='/dialogs'
                           render={() => <DialogsContainer
                           />}/>

                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/care' render={() => <Care/>}/>
                    <Route path='/forum' render={() => <Forum/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                </Switch>

            </div>
        </div>
    );
}



