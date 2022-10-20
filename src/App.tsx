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
import {StatePropsType, StoreType} from "./redux/store";



type AppPropsType = {
   store: StoreType
    /*addPost: (newPostText: string) => void
    updateNewPostText: (updatedPostText: string) => void

    sendMessage: (newMessageText: string) => void
    updateNewMessageText: (updatedMessageText: string) => void*/
}

export const App = (props: AppPropsType) => {

    const state = props.store.getState()

    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar friendsFromBar={props.store.getState().sidebar.friendsFromBar}/>

            <div className='app-wrapper-content'>
                <Route path='/profile'
                       render={() => <Profile
                           profilePage={props.store.getState().profilePage}
                           addPost={props.store.addPost.bind(props.store)}
                           updateNewPostText={props.store.updateNewPostText.bind(props.store)}
                       />}/>

                <Route path='/dialogs'
                       render={() => <Dialogs
                           dialogsPage={props.store.getState().dialogsPage}
                           sendMessage={props.store.sendMessage.bind(props.store)}
                           updateNewMessageText={props.store.updateNewMessageText.bind(props.store)}
                       />}/>

                <Route path='/care' render={() => <Care/>}/>
                <Route path='/forum' render={() => <Forum/>}/>
                <Route path='/settings' render={() => <Settings/>}/>
            </div>
        </div>
    );
}



