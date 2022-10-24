import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Route} from "react-router-dom";
import {Care} from "./components/Care/Care";
import {Forum} from "./components/Forum/Forum";
import {Settings} from "./components/Settings/Settings";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";


type AppPropsType = {
  // store: AppStateType
    /*addPost: (newPostText: string) => void
    updateNewPostText: (updatedPostText: string) => void
    sendMessage: (newMessageText: string) => void
    updateNewMessageText: (updatedMessageText: string) => void*/
}

export const App = (props: AppPropsType) => {

    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar />

            <div className='app-wrapper-content'>
                <Route path='/profile'
                       render={() => <Profile


                           //store={props.store}
                          /* profilePage={props.store.getState().profilePage}
                           dispatch={props.store.dispatch.bind(props.store)*/
                           /*addPost={props.store.addPost.bind(props.store)}
                           updateNewPostText={props.store.updateNewPostText.bind(props.store)}*/
                       />}/>

                <Route path='/dialogs'
                       render={() => <DialogsContainer


                           //store={props.store}
                          /* dialogsPage={props.store.getState().dialogsPage}
                           dispatch={props.store.dispatch.bind(props.store)}*/
                           /*sendMessage={props.store.sendMessage.bind(props.store)}
                           updateNewMessageText={props.store.updateNewMessageText.bind(props.store)}*/
                       />}/>

                <Route path='/care' render={() => <Care/>}/>
                <Route path='/forum' render={() => <Forum/>}/>
                <Route path='/settings' render={() => <Settings/>}/>
            </div>
        </div>
    );
}



