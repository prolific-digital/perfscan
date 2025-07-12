import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const enterpriseServerApi = createApi({
  reducerPath: "enterpriseServer",
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
    getServers: builder.query({
      query: () => `api/cpudata`,
    }),
    getCPUData: builder.query({
      query: () => `api/cpudata`,
    }),
  }),
});

export const { useGetServersQuery, useGetCPUDataQuery } = enterpriseServerApi;
