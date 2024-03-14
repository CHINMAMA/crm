import { createSlice } from "@reduxjs/toolkit"
import { loginUser, registerUser, get_dashboard_data, viewUsers, DeleteUserByAdmin, DeleteYourself } from "../actions/authActions"
import { viewGyms, AddGym } from "../actions/gymsActions"

const accessToken = localStorage.getItem('accessToken')
    ? localStorage.getItem('accessToken')
    : null

const initialState = {
    loading: false,
    userInfo: {}, 
    accessToken,
    error: null,
    success: false,
    loginTab: 0,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoginTab(state, action) {
            console.log("SET LOGIN TAB STATE");
            console.log(state.loginTab);
            if (action.payload in [0, 1])
                state.loginTab = action.payload
            return state
        },
        setCredentials(state, action) {
            state.userInfo = action.payload
            return state
        },
        logout(state) {
            localStorage.removeItem('accessToken')
            state.loading = false
            state.userInfo = null
            state.accessToken = null
            state.error = null
            return state
        },
        login(state, data) {
            console.log(data)
            loginUser(data)
            state.loading = false
            state.userInfo = null
            state.error = null
            return state
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(AddGym.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(AddGym.fulfilled, (state, { payload }) => {
                state.loading = false
                state.success = true
            })
            .addCase(AddGym.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
            .addCase(viewGyms.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(viewGyms.fulfilled, (state, { payload }) => {
                state.loading = false
                state.success = true
            })
            .addCase(viewGyms.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
            .addCase(DeleteYourself.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(DeleteYourself.fulfilled, (state, { payload }) => {
                state.loading = false
                state.success = true
            })
            .addCase(DeleteYourself.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
            .addCase(DeleteUserByAdmin.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(DeleteUserByAdmin.fulfilled, (state, { payload }) => {
                state.loading = false
                state.success = true
            })
            .addCase(DeleteUserByAdmin.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
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
            .addCase(viewUsers.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(viewUsers.fulfilled, (state, { payload }) => {
                state.loading = false
                state.success = true
            })
            .addCase(viewUsers.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
            .addCase(get_dashboard_data.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(get_dashboard_data.fulfilled, (state, { payload }) => {
                state.loading = false
                state.success = true
            })
            .addCase(get_dashboard_data.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false
                state.accessToken = payload.accessToken
                state.userInfo = payload.user
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
    }
})

export default authSlice.reducer
export const { setLoginTab, setCredentials, logout, registrate, login } = authSlice.actions