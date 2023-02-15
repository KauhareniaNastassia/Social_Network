import {TypedUseSelectorHook, useSelector} from 'react-redux'
import {AppStateType} from "../redux/redux-store";



// Use throughout your app instead of plain `useDispatch` and `useSelector`

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector