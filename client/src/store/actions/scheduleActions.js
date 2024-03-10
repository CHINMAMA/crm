import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { SERVER_URL } from '../../utils/constants'

export const getScheduleData = createAsyncThunk(
    'schedule/get',
    async ({ userId }, { rejectWithValue }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(
                `${SERVER_URL}/schedule?userId=${userId}`,
                config
            )
            .then((response) => response ?? {})
            .catch((error) => {
                if (error.response && error.response.data.message) {
                    return rejectWithValue(error.response.data.message)
                } else {
                    return rejectWithValue(error.message)
                }            
            })
    }
)

export const postScheduleAppointment = createAsyncThunk(
    'schedule/post',
    async ({ userId, appointmentData }, { rejectWithValue }) => {
        axios.post(
                `${SERVER_URL}/schedule`,
                { userId, gymId, title, startDate, endDate, recurrence: recurrence ?? null},
                config
            )
            .then((response) => ({}))
            .catch((error) => {
                if (error.response && error.response.data.message) {
                    return rejectWithValue(error.response.data.message)
                } else {
                    return rejectWithValue(error.message)
                }                 
            })
    }
)