import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { SERVER_URL } from "../utils/constants"

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: SERVER_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.accessToken
            const auth_token = localStorage.getItem('auth_token')
            const login_cookie = localStorage.getItem('login_cookie')
            if (token) {
                headers.set('authorization', `Bearer ${token}`)  
            }
            if (auth_token) {
                headers.set('auth_token', auth_token)
            }
            if (login_cookie) {
                headers.set('login_cookie', login_cookie)
            }
            return headers
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