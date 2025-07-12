import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const entityApi = createApi({
  reducerPath: "entity",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pickaxe-backend.greymine.com/",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json, text/plain, */*");
      headers.set("Access-Control-Allow-Origin", "*");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getEtypes: builder.query({
      query: () => `api/etypes`,
    }),
    addEntity: builder.mutation({
      query: (body) => {
        return {
          url: `api/entity`,
          method: "POST",
          body,
        };
      },
    }),
    updateEntity: builder.mutation({
      query: (body) => {},
    }),
    getAllEntity: builder.query({
      query: () => `api/entity`,
    }),
  }),
});

export const {
  useGetEtypesQuery,
  useAddEntityMutation,
  useUpdateEntityMutation,
  useGetAllEntityQuery,
} = entityApi;
