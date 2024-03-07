import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers/index.js'
import { authApi } from '../services/authService.js'

const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => {
    //     getDefaultMiddleware().concat(authApi.middleware)
    // }
})

export default store