import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers/index.js'
import { authApi } from '../services/authService.js'
import { scheduleApi } from '../services/scheduleService.js'

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(scheduleApi.middleware)
})

export default store