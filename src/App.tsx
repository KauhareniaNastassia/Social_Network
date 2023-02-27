import React, {useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import {Care} from "./components/Care/Care";
import {initializeAppThunkCreator} from "./redux/appReducer";
import {PreloaderDog} from "./common/preloader/PreloaderDog/PreloaderDog";
import {Login} from "./components/Login/Login";
import 'antd/dist/reset.css';
import {useAppDispatch, useAppSelector} from "./hoc/useAppSelector";
import {Layout} from "./components/Layout/Layout";
import {Header} from "./components/Header/Header";
import {Users} from "./components/Users/Users";
import {Profile} from "./components/Profile/Profile";
import {DialogsPage} from "./components/Dialogs/DialogsPage";
import {ChatPage} from "./pages/chatpage/ChatPage";
import PageNotFound from "./components/PageNotFoung/PageNotFound";
import {NotificationAlert} from "./components/NotificationAlert/NotificationAlert";


export const App: React.FC = () => {

    const initialized = useAppSelector(state => state.app.initialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppThunkCreator())
        console.log('initialization')
    }, [])


    if (!initialized) {
        return <PreloaderDog/>
    }


    return (
        <div className="app-wrapper">

            <Header/>
            <NotificationAlert/>
            <div className='app-wrapper-content'>

                <Routes>

                    <Route element={<Layout/>}>

                        <Route path='/' element={<Navigate to={'/profile'}/>}/>
                        <Route path='/profile/:userId?' element={<Profile/>}/>
                        <Route path='/dialogs' element={<DialogsPage/>}/>
                        <Route path='/users' element={<Users/>}/>
                        <Route path='/care' element={<Care/>}/>
                        <Route path='/forum' element={<ChatPage/>}/>

                    </Route>

                    <Route path='/login' element={<Login/>}/>

                    <Route path='*' element={<PageNotFound/>}/>
                </Routes>

            </div>

        </div>
    );

}

