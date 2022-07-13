import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi({
  reducerPath: "messages",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/messages/chat`,
  }),
  endpoints: (builder) => ({

    addMessage: builder.mutation({
      query: ({ author, message }) => ({
        method: 'POST',
        body: {
            author,
            message
        }
      }),
    })

  })
});


export const { useAddMessageMutation } = messagesApi;

