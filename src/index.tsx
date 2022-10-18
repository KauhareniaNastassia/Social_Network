import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import state, {
    addPost,
    sendMessage,
    StatePropsType,
    subscribe,
    updateNewMessageText,
    updateNewPostText
} from './redux/state'
import {BrowserRouter} from "react-router-dom";


let rerenderEntireTree = (state: StatePropsType) => {

    ReactDOM.render(
        <BrowserRouter>
            <App
                state={state}
                addPost={addPost}
                updateNewPostText={updateNewPostText}

                sendMessage={sendMessage}
                updateNewMessageText={updateNewMessageText}
            />
        </BrowserRouter>,
        document.getElementById('root')
    )
}

rerenderEntireTree(state)

subscribe(rerenderEntireTree)



