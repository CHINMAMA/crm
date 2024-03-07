import { createSlice } from "@reduxjs/toolkit"
import { loginUser, registerUser } from "../actions/authActions"


const initialState = {
    loading: false,
    userInfo: {}, 
    userToken: null,
    error: null,
    success: false,
    loginTab: 0,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoginTab(state, action) {
            if (action.payload in [0, 1])
                state.loginTab = action.payload
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.loading = false
                state.success = true
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false
                state.userInfo = payload
                state.userToken = payload.userToken
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
    }
})

export default authSlice.reducer
export const { setLoginTab } = authSlice.actions