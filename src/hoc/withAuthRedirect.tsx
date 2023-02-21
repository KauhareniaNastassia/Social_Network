import React, {ComponentType} from 'react';
import {Navigate} from "react-router-dom";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state: AppStateType): mapStateToPropsForRedirectType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export function withAuthRedirect<T>(Component: ComponentType<T>) {
    function RedirectComponent(props: mapStateToPropsForRedirectType) {

        let {isAuth, ...restProps} = props

        if (!isAuth) return <Navigate to={'/login'}/>

        return <Component {...restProps as T} />
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect) (RedirectComponent);

    return ConnectedAuthRedirectComponent;
};

//===========TYPE================

type mapStateToPropsForRedirectType = {
    isAuth: boolean
}