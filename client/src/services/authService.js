import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { SERVER_URL } from "../utils/constants"

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: SERVER_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.accessToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)  
                return headers
            }
        },
    }),
    endpoints: (builder) => ({
        getUserDetails: builder.query({
            query: (userId) => ({
                url: `users/${userId}`,
                method: 'GET',
            }),
        }),
    }),
})
  
export const { useGetUserDetailsQuery } = authApi