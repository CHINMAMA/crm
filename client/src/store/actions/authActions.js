import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = 'http://127.0.0.1:5000'

export const registerUser = createAsyncThunk(
    'user/registrate',
    async ({ firstName, email, password }, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            
            await axios.post(
                `${backendURL}/registrate`,
                { firstName, email, password },
                config
            )
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
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const { data } = await axios.post(
                `${backendURL}/login`,
                { email, password },
                config
            )

            localStorage.setItem('userToken', data.userToken)
            return data
        } catch(error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)