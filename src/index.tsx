import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import {BrowserRouter, HashRouter} from "react-router-dom";
import {store} from "./redux/redux-store";
import {Provider} from "react-redux";

ReactDOM.render(
    <HashRouter>
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
    </HashRouter>,
    document.getElementById('root')
)







