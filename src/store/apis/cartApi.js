import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: "carts",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/carts`,
    //prepareHeaders: (headers, { getState }) => {
      //headers.set("Authorization", `${localStorage.getItem("access_token")}`)
      //return headers
    //}
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({

    getCart: builder.query({
      query: (body) => ({ 
        url: `/${body}`,
      }),
      providesTags: ["Contact"]
    }),

    createNewCart: builder.mutation({
      query: (body) => ({ 
        url: `/${body}`,
        method: "POST",
      })
    }),

    addProductToCart: builder.mutation({
      query: ({ idProduct, idCart }) => ({ 
        url: `/${idCart}/products/${idProduct}`,
        method: "POST",
      }),
      invalidatesTags: ["Contact"]
    }),

    deleteProductToCart: builder.mutation({
      query: ({ idProduct, idCart }) => ({ 
        url: `/${idCart}/delete/${idProduct}`,
        method: "POST",
      }),
      invalidatesTags: ["Contact"]
    }),

    confirmCart: builder.mutation({
      query: ({ idCart }) => ({
        url: `/${idCart}/carts`,
        method: 'POST'
      }),
      invalidatesTags: ["Contact"]
    })

  })
});


export const { useGetCartQuery, useCreateNewCartMutation, useAddProductToCartMutation, useDeleteProductToCartMutation, useConfirmCartMutation } = cartApi;

