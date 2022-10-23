import React from 'react'
import {Dialogs} from "./Dialogs";
import {initialStateDialogsPageType, sendMessageAC, updateNewMessageTextAC} from "../../redux/dialogsPageReducer";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";


export type mapStateToDialogsPropsType = {
    dialogsPage: initialStateDialogsPageType
}

export type mapDispatchToDialogsPropsType = {
    sendMessage: () => void
    updateNewMessageText: (updatedMessageText: string) => void
}

export type DialogsPropsType = mapStateToDialogsPropsType & mapDispatchToDialogsPropsType


let mapStateToDialogsProps = (state: AppStateType):mapStateToDialogsPropsType  => {
    return {
        dialogsPage: state.dialogsPage
    }
}

let mapDispatchDialogsToProps = (dispatch: Dispatch): mapDispatchToDialogsPropsType => {
    return {
        sendMessage: () => {
            dispatch(sendMessageAC())
        },
        updateNewMessageText: (updatedMessageText: string) => {
            dispatch(updateNewMessageTextAC(updatedMessageText))
        }
    }
}

export const DialogsContainer = connect(mapStateToDialogsProps, mapDispatchDialogsToProps)(Dialogs)





/*type DialogsPropsType = {
    //store: AppStateType
    /!* dialogsPage: DialogsPageType
     dispatch: (action: ActionType) => void*!/
    /!*sendMessage: (newMessageText: string) => void
    updateNewMessageText: (updatedMessageText: string) => void*!/
}*/


/*export const DialogsContainer = (props: DialogsPropsType) => {

    return <StoreContext.Consumer>
        {store => {

            let sendMessageHandler = () => {
                store.dispatch(sendMessageAC(store.getState().dialogsPage.newMessageText))
                store.getState().dialogsPage.newMessageText = ''
            }

            let onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
                debugger
                store.dispatch(updateNewMessageTextAC(e.currentTarget.value))
            }


            return (
                <Dialogs
                    dialogs={store.getState().dialogsPage.dialogs}
                    messages={store.getState().dialogsPage.messages}
                    newMessageText={store.getState().dialogsPage.newMessageText}
                    sendMessage={sendMessageHandler}
                    updateNewMessageText={onMessageChange}/>
            )
        }
        }
    </StoreContext.Consumer>
}*/







/*
export const DialogsContainer = (props: DialogsPropsType) => {

    let sendMessageHandler = () => {
        props.store.dispatch(sendMessageAC( props.store.getState().dialogsPage.newMessageText ))
        props.store.getState().dialogsPage.newMessageText = ''
    }

    let onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        debugger
        props.store.dispatch(updateNewMessageTextAC(e.currentTarget.value) )
    }


    return (
        <Dialogs
            dialogs={props.store.getState().dialogsPage.dialogs}
            messages={props.store.getState().dialogsPage.messages}
            newMessageText={props.store.getState().dialogsPage.newMessageText}
            sendMessage={sendMessageHandler}
            updateNewMessageText={onMessageChange}/>
    )
}*/
