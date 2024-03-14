import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { SERVER_URL } from '../../utils/constants'


export const viewGyms = createAsyncThunk(
    'user/view_gyms/',
    async ({ rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const { data } = await axios.post(
                `${SERVER_URL}/view_gyms/`,
                {},
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

export const AddGym = createAsyncThunk(
    'user/add_gym/',
    async ({ name, country, city, address, login_cookie, auth_token }, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const { data } = await axios.post(
                `${SERVER_URL}/add_gym/`,
                {
                    'login_cookie': login_cookie,
                    'auth_token': auth_token,
                    'name': name,
                    'country': country,
                    'city': city,
                    'address': address,
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