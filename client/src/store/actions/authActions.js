import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { SERVER_URL } from '../../utils/constants'

export const registerUser = createAsyncThunk(
    'user/registrate',
    async ({ firstName, lastName, phoneNumber, email, password, role }, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            await axios.post(
                `${SERVER_URL}/register`,
                { firstName, lastName, phoneNumber, email, password, role },
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
                `${SERVER_URL}/login`,
                { email, password },
                config
            )
            
            console.log(data);

            localStorage.setItem('accessToken', data.accessToken)
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