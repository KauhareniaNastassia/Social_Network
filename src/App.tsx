import React, {Component, Suspense} from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {Care} from "./components/Care/Care";
import {Forum} from "./components/Forum/Forum";
import {UsersContainer} from "./components/Users/UsersContainer";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {LoginContainer} from "./components/Login/LoginContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeAppThunkCreator} from "./redux/appReducer";
import {AppStateType} from "./redux/redux-store";
import {PreloaderDog} from "./common/preloader/PreloaderDog/PreloaderDog";


const DialogsContainer = React.lazy(async () => ({default: (await import('./components/Dialogs/DialogsContainer')).DialogsContainer}))

const ProfileContainer = React.lazy(async () => ({default: (await import('./components/Profile/ProfileContainer')).ProfileContainer}))


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
                                   render={() => <DialogsContainer
                                   />}/>

                            <Route path='/users' render={() => <UsersContainer/>}/>
                            <Route path='/care' render={() => <Care/>}/>
                            <Route path='/forum' render={() => <Forum/>}/>

                            <Route path='/login' render={() => <LoginContainer/>}/>

                            <Route path='*' render={() =><div>404 NOT FOUND</div>}/>
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





