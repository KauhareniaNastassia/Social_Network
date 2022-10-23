import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import {BrowserRouter} from "react-router-dom";
import {store} from "./redux/redux-store";
import {Provider} from "react-redux";




let rerenderEntireTree = () => {

    ReactDOM.render(
        <BrowserRouter>

            <Provider store={store}>
                <App

                    //store={store}
                    //store={store}
                    /*state={store.getState()}
                    addPost={store.addPost.bind(store)}
                    updateNewPostText={store.updateNewPostText.bind(store)}

                    sendMessage={store.sendMessage.bind(store)}
                    updateNewMessageText={store.updateNewMessageText.bind(store)}*/
                />
            </Provider>


        </BrowserRouter>,
        document.getElementById('root')
    )
}

rerenderEntireTree()

store.subscribe(() => {
    let state = store.getState()
    rerenderEntireTree()
})





