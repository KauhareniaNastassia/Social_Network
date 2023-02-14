import React from 'react'
import {Dialogs} from "./Dialogs";
import {initialStateDialogsPageType, sendMessageAC, updateNewMessageTextAC} from "../../redux/dialogsPageReducer";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


let mapStateToDialogsProps = (state: AppStateType): mapStateToDialogsPropsType => {
    return {
        dialogsPage: state.dialogsPage,
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

export const DialogsContainer = compose<React.ComponentType>(
    connect(mapStateToDialogsProps, mapDispatchDialogsToProps),
    withAuthRedirect
)(Dialogs)


//===========TYPE================

export type mapStateToDialogsPropsType = {
    dialogsPage: initialStateDialogsPageType
}

export type mapDispatchToDialogsPropsType = {
    sendMessage: () => void
    updateNewMessageText: (updatedMessageText: string) => void
}

export type DialogsPropsType = mapStateToDialogsPropsType & mapDispatchToDialogsPropsType
