import { createApi } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: graphqlRequestBaseQuery({
    url: `${process.env.REACT_APP_BACKEND_URL}/api/products/graphql`,
  }),

  endpoints: (builder) => ({

    getAllProducts: builder.query({
      query: () => ({ 
        document: gql`{ listAll { id title price description photoUrl stock } } `
      }),
      transformResponse: (response) => response.listAll
    })

  })
});


export const { useGetAllProductsQuery } = productsApi;

