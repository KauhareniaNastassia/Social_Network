import React, {useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom'
import {Care} from "./components/Care/Care";
import {initializeAppThunkCreator} from "./redux/appReducer";
import {PreloaderDog} from "./common/preloader/PreloaderDog/PreloaderDog";
import {Login} from "./components/Login/Login";
import 'antd/dist/reset.css';
import {Button} from "antd";
import {useAppDispatch, useAppSelector} from "./hoc/useAppSelector";
import {Layout} from "./components/Layout/Layout";
import {Header} from "./components/Header/Header";
import {Users} from "./components/Users/Users";
import {Profile} from "./components/Profile/Profile";
import {DialogsPage} from "./components/Dialogs/DialogsPage";
import {ChatPage} from "./pages/chatpage/ChatPage";


export const App: React.FC = () => {

    const initialized = useAppSelector((state) => state.app.initialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppThunkCreator())
    }, [])


    return (
        <div className="app-wrapper">

            {!initialized ? <PreloaderDog/> : null}

            <Header/>


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

                        <Route path='*' element={<div>
                            <Button>OK</Button>
                            404 NOT FOUND</div>}/>
                    </Routes>
            </div>
        </div>
    );

}

