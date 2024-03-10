import { combineReducers } from 'redux'
import authReducer from './authReducer';
import { authApi } from '../../services/authService';
import { scheduleApi } from '../../services/scheduleService';

const rootReducer = combineReducers({
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer
})

export default rootReducer

 