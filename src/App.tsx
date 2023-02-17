import React, {Component, Suspense} from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {Care} from "./components/Care/Care";
import {Forum} from "./components/Forum/Forum";
import {UsersPage} from "./components/Users/UsersPage";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeAppThunkCreator} from "./redux/appReducer";
import {AppStateType} from "./redux/redux-store";
import {PreloaderDog} from "./common/preloader/PreloaderDog/PreloaderDog";
import {Login} from "./components/Login/Login";
import 'antd/dist/reset.css';
import {Button} from "antd";



const DialogsPage = React.lazy(async () => ({default: (await import('./components/Dialogs/DialogsPage')).DialogsPage}))

const ProfileContainer = React.lazy(async () => ({default: (await import('./components/Profile/ProfileContainer')).ProfileContainer}))

const ChatPage = React.lazy(async () => ({default: (await import('./pages/chatpage/ChatPage')).ChatPage}))



export class App extends Component<AppContainerPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {

        if (!this.props.initialized) {
            return <PreloaderDog/>
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>

                <div className='app-wrapper-content'>
                    <Suspense fallback={<div>< PreloaderDog/></div>}>
                        <Switch>

                            <Route exact path='/'
                                   render={() => <Redirect to={'/profile'}/> }/>

                            <Route path='/profile/:userId?'
                                   render={() => <ProfileContainer
                                   />}/>

                            <Route path='/dialogs'
                                   render={() => <DialogsPage
                                   />}/>

                            <Route path='/users' render={() => <UsersPage/>}/>
                            <Route path='/care' render={() => <Care/>}/>
                            <Route path='/forum' render={() => <Forum/>}/>

                            <Route path='/login' render={() => <Login/>}/>


                            <Route path='/chat' render={() => <ChatPage/>}/>

                            <Route path='*' render={() =><div>
                                <Button>OK</Button>
                                404 NOT FOUND</div>}/>
                        </Switch>
                    </Suspense>
                </div>
            </div>
        );
    }
}


export const mapStateToAppPropsType = (state: AppStateType): mapStateToAppPropsType => {
    return {
        initialized: state.app.initialized
    }
}

export const AppContainer = compose<React.ComponentType>(
    connect(mapStateToAppPropsType,
        {
            initializeApp: initializeAppThunkCreator
        }),
    withRouter)(App)


//===========TYPE================

type mapStateToAppPropsType = {
    initialized: boolean
}

type MapDispatchToAppPropsType = {
    initializeApp: () => void
}

export type AppPropsType = mapStateToAppPropsType & MapDispatchToAppPropsType
export type AppContainerPropsType = Readonly<AppPropsType>





