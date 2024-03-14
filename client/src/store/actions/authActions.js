import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { SERVER_URL } from '../../utils/constants'

export const DeleteYourself = createAsyncThunk(
    'user/deletion/',
    async ({email, password, login_cookie, auth_token}, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const { data } = await axios.post(
                `${SERVER_URL}/deletion/`,
                {
                    'email': email,
                    'password': password,
                    'login_cookie': login_cookie,
                    'auth_token': auth_token
                },
                config
            )
            return data
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const DeleteUserByAdmin = createAsyncThunk(
    'user/delete_user_by_admin/',
    async ({email, login_cookie, auth_token}, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const { data } = await axios.post(
                `${SERVER_URL}/delete_user_by_admin/`,
                {
                    'email': email,
                    'login_cookie': login_cookie,
                    'auth_token': auth_token
                },
                config
            )
            return data
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const viewUsers = createAsyncThunk(
    'user/view_users/',
    async ({login_cookie, auth_token}, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const { data } = await axios.post(
                `${SERVER_URL}/view_users/`,
                {
                    'login_cookie': login_cookie,
                    'auth_token': auth_token
                },
                config
            )
            return data
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const get_dashboard_data = createAsyncThunk(
    'user/dashboard/',
    async ({login_cookie, auth_token}, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const { data } = await axios.post(
                `${SERVER_URL}/dashboard/`,
                {
                    'login_cookie': login_cookie,
                    'auth_token': auth_token
                },
                config
            )
            return data
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const registerUser = createAsyncThunk(
    'user/registrate/',
    async ({ firstName, lastName, phoneNumber, email, password, role }, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const { data } = await axios.post(
                `${SERVER_URL}/register/`,
                {
                    'firstName': firstName,
                    'lastName': lastName,
                    'phoneNumber': phoneNumber,
                    'email': email,
                    'password': password,
                    'role': role
                },
                config
            )
            return data
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }            
        }
    }
)

export const loginUser = createAsyncThunk(
    'user/login/',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            console.log(email)
            const { data } = await axios.post(
                `${SERVER_URL}/login/`,
                { 'email': email, 'password': password },
                config
            )
            localStorage.setItem('login_cookie', data.login_cookie)
            localStorage.setItem('auth_token', data.auth_token)
            return data
        } catch(error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)