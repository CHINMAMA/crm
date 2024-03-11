import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { SERVER_URL } from "../utils/constants"

export const scheduleApi = createApi({
    reducerPath: 'scheduleApi',
    tagTypes: [
        'Appointments',
        'Gyms',
        'Trainers'
    ],
    baseQuery: fetchBaseQuery({
        baseUrl: SERVER_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.accessToken
            headers.set('Content-Type', 'application/json')
            if (token) {
                headers.set('authorization', `Bearer ${token}`)  
                return headers
            }
        },
    }),
    endpoints: (builder) => ({
        getAppointments: builder.query({
            query: ({userId, role}) => ({
                url: `appointments/?${
                    role === 'GYM OWNER' ? 
                    'userId' : 
                    role === 'TRAINER' ? 
                    'trainerId' : 
                    'trainerId'
                }=${userId}`,
                method: 'GET',
            }),
            providesTags: (result) => 
                result ?
                [
                    ...result.map(({ id }) => ({ type: 'Appointments', id })),
                    { type: 'Appointments', id: 'LIST' }
                ] :
                [{ type: 'Appointments', id: 'LIST' }]
        }),
        addAppointment: builder.mutation({
            query: ({
                userId,
                appointmentData
            }) => {
                console.log(appointmentData);
                if (!appointmentData || Object.keys(appointmentData).length === 0) {
                    return {}
                }               
                return {
                    url: 'appointments/',
                    method: 'POST',
                    body: {
                        userId, 
                        ...appointmentData
                    }
                }
            },
            invalidatesTags: [{ type: 'Appointments', id: 'LIST' }]
        }),
        deleteAppointment: builder.mutation({
            query: (id) => ({
                url: `appointments/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{ type: 'Appointments', id: 'LIST' }]
        }),
        updateAppointment: builder.mutation({
            query: ({id, appointmentData}) => ({
                url: `appointments/${id}`,
                method: 'PATCH',
                body: appointmentData
            }),
            invalidatesTags: [{ type: 'Appointments', id: 'LIST' }]
        }),
        getGymsByOwner: builder.query({
            query: (userId) => ({
                url: `gyms?userId=${userId}`,
                method: 'GET',
            }),
            providesTags: (result) => 
                result ?
                [
                    ...result.map(({ id }) => ({ type: 'Gyms', id })),
                    { type: 'Gyms', id: 'LIST' }
                ] :
                [{ type: 'Gyms', id: 'LIST' }]
        }),
        getGyms: builder.query({
            query: (gymsId) => ({
                url: `gyms?${gymsId.map(id => `id=${id}`).join('&')}`,
                method: 'GET',
            }),
            providesTags: (result) => 
                result ?
                [
                    ...result.map(({ id }) => ({ type: 'Gyms', id })),
                    { type: 'Gyms', id: 'LIST' }
                ] :
                [{ type: 'Gyms', id: 'LIST' }]
        }),
        getAllGyms: builder.query({
            query: () => ({
                url: 'gyms',
                method: 'GET',
            }),
            providesTags: (result) => 
                result ?
                [
                    ...result.map(({ id }) => ({ type: 'Gyms', id })),
                    { type: 'Gyms', id: 'LIST' }
                ] :
                [{ type: 'Gyms', id: 'LIST' }]
        }),
        getGym: builder.query({
            query: (gymsId) => ({
                url: `gyms/${gymsId}`,
                method: 'GET',
            }),
            providesTags: (result) => 
                result ?
                [
                    { type: 'Gyms', id: result.id },
                    { type: 'Gyms', id: 'LIST' }
                ] :
                [{ type: 'Gyms', id: 'LIST' }]
        }),
        addGym: builder.mutation({
            query: ({
                userId,
                gymData
            }) => ({
                url: 'gyms',
                method: 'POST',
                body: {userId: userId, ...gymData}
            }),
            invalidatesTags: [{ type: 'Gyms', id: 'LIST' }]
        }),
        updateGym: builder.mutation({
            query: ({id, gymData}) => ({
                url: `gyms/${id}`,
                method: 'PATCH',
                body: {
                    ...gymData
                }
            }),
            invalidatesTags: [{ type: 'Gyms', id: 'LIST' }]
        }),
        deleteGym: builder.mutation({
            query: (id) => ({
                url: `gyms/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Gyms', id: 'LIST' }]
        }),
        addTrainerToGym: builder.mutation({
            query: ({gymId, trainerId}) => ({
                url: 'gymTrainer',
                method: 'POST',
                body: {
                    trainerId,
                    gymId,
                    status: 'sent'
                }
            }),
            invalidatesTags: [
                { type: 'Gyms', id: 'LIST' },
                { type: 'Trainers', id: 'LIST' }
            ]
        }),
        acceptTrainerToGym: builder.mutation({
            query: (id) => ({
                url: `gymTrainer/${id}`,
                method: 'PATCH',
                body: { status: 'accepted' }
            }),
            invalidatesTags: [
                { type: 'Gyms', id: 'LIST' },
                { type: 'Trainers', id: 'LIST' }
            ]
        }),
        getTrainers: builder.query({
            query: (trainersId) => {
                if (!trainersId || trainersId.length === 0) {
                    return {}
                }
                return {url: `users?${trainersId.map((id) => `id=${id}`).join('&')}`}
            },
            providesTags: (result) => 
                result ?
                [
                    ...result.map(({ id }) => ({ type: 'Trainers', id })),
                    { type: 'Trainers', id: 'LIST' }
                ] :
                [{ type: 'Trainers', id: 'LIST' }]

        }),
        getAllTrainers: builder.query({
            query: () => ({url: 'users?role=TRAINER'}),
            providesTags: (result) => 
                result ?
                [
                    ...result.map(({ id }) => ({ type: 'Trainers', id })),
                    { type: 'Trainers', id: 'LIST' }
                ] :
                [{ type: 'Trainers', id: 'LIST' }]
        }),
        getGymTrainersByTrainers: builder.query({
            query: (trainersId) => {
                if (!trainersId || trainersId.length === 0) {
                    return {}
                }
                console.log('abshda');
                console.log(trainersId);
                return {
                    url: `gymTrainer?${trainersId.map(id => `trainerId=${id}`).join('&')}`,
                }
            },
            providesTags: (result) => 
            result ?
            [
                ...result.map(({ id }) => ({ type: 'Trainers', id })),
                { type: 'Trainers', id: 'LIST' },
                { type: 'Gyms', id: 'LIST' }
            ] :
            [{ type: 'Trainers', id: 'LIST' },
             { type: 'Gyms', id: 'LIST' }]
        }),
        getGymTrainersByGyms: builder.query({
            query: (gymsId) => {
                if (!gymsId || gymsId.length === 0) {
                    return {}
                }
                return {
                    url: `gymTrainer?${gymsId.map(id => `gymId=${id}`).join('&')}`,
                }
            },
            providesTags: (result) => 
            result ?
            [
                ...result.map(({ id }) => ({ type: 'Trainers', id })),
                { type: 'Trainers', id: 'LIST' },
                { type: 'Gyms', id: 'LIST' }
            ] :
            [{ type: 'Trainers', id: 'LIST' },
             { type: 'Gyms', id: 'LIST' }]
        }),
        deleteGymTrainersByTrainer: builder.mutation({
            query: (trainerId) => ({
                url: `gymTrainer?trainerId=${trainerId}`,
                method: 'DELETE'
            }),
            invalidatesTags: [
                { type: 'Trainers', id: 'LIST' },
                { type: 'Gyms', id: 'LIST' }
            ]
        }),
        deleteGymTrainersByGym: builder.mutation({
            query: (gymId) => ({
                url: `gymTrainer?gymId=${gymId}`,
                method: 'DELETE'
            }),
            invalidatesTags: [
                { type: 'Trainers', id: 'LIST' },
                { type: 'Gyms', id: 'LIST' }
            ]
        }),
        deleteGymTrainer: builder.mutation({
            query: () => ({
                method: 'DELETE'
            })
        })
    }),
})
  
export const { 
    useAddAppointmentMutation,
    useDeleteAppointmentMutation,
    useUpdateAppointmentMutation,
    useGetAppointmentsQuery,
    useAddGymMutation,
    useGetGymsQuery,
    useGetGymQuery,
    useGetGymsByOwnerQuery,
    useGetTrainersQuery,
    useAddTrainerToGymMutation,
    useAcceptTrainerToGymMutation,
    useGetGymTrainersByGymsQuery,
    useGetGymTrainersByTrainersQuery,
    useGetAllTrainersQuery,
    useUpdateGymMutation,
    useDeleteGymMutation,
    useDeleteGymTrainersByTrainerMutation,
    useDeleteGymTrainersByGymMutation,
    useGetAllGymsQuery
} = scheduleApi