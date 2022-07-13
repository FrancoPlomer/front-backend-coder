import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/users`
  }),

  endpoints: (builder) => ({
    postUserRegister: builder.mutation({
      query: (body) => ({ 
        url: "/register",
        method: "POST",
        body,
      })
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      })
    })
  })
});


export const { usePostUserRegisterMutation, useLoginUserMutation } = userApi;

