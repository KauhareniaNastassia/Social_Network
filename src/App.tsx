import React from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {Route, Switch} from 'react-router-dom'
import {Care} from "./components/Care/Care";
import {Forum} from "./components/Forum/Forum";
import {Settings} from "./components/Settings/Settings";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {UsersContainer} from "./components/Users/UsersContainer";
import {ProfileContainer} from "./components/Profile/ProfileContainer";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {Login} from "./components/Login/Login";



export const App = () => {

    return (
        <div className="app-wrapper">
            <HeaderContainer/>
            <Navbar/>

            <div className='app-wrapper-content'>
                <Switch>
                    <Route path='/profile/:userId?'
                           render={() => <ProfileContainer
                           />}/>

                    {/*<Route path='/profile/'
                           render={() => <ProfileContainer
                           />}/>
*/}
                    <Route path='/dialogs'
                           render={() => <DialogsContainer
                           />}/>

                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/care' render={() => <Care/>}/>
                    <Route path='/forum' render={() => <Forum/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>

                    <Route path='/login' render={() => <Login/>}/>
                </Switch>

            </div>
        </div>
    );
}



