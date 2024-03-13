import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { SERVER_URL } from '../../utils/constants'

export const get_data = createAsyncThunk(
    'user/index/',
    async ({ rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                `${SERVER_URL}/index/`,
            )
            if (data.auth === '0') {
                return 'Anonymous'
            }
            else {
                return 'Anonymous'
                //return data.username
            }
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