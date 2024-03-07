import { combineReducers } from 'redux'
import authReducer from './authReducer';
import { authApi } from '../../services/authService';

const rootReducer = combineReducers({
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer
})

export default rootReducer

 