import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import {BrowserRouter} from "react-router-dom";
import {AppStateType, store} from "./redux/redux-store";



let rerenderEntireTree = (props: AppStateType) => {

    ReactDOM.render(
        <BrowserRouter>
            <App

                store={store}
                //store={store}
                /*state={store.getState()}
                addPost={store.addPost.bind(store)}
                updateNewPostText={store.updateNewPostText.bind(store)}

                sendMessage={store.sendMessage.bind(store)}
                updateNewMessageText={store.updateNewMessageText.bind(store)}*/
            />
        </BrowserRouter>,
        document.getElementById('root')
    )
}

rerenderEntireTree(store.getState())

store.subscribe(() => {
    let state = store.getState()
    rerenderEntireTree(state)
})





