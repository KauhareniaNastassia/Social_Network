import React from "react";
import {AppStateType, store} from "./redux/redux-store";


 const StoreContext = React.createContext({} as AppStateType)


 type ProviderType = {
    store: AppStateType
    children: React.ReactNode
}


 const Provider = (props: ProviderType) => {
    return <StoreContext.Provider value={props.store}>
        {props.children}
    </StoreContext.Provider>
}