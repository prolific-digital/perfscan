import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const settingsApi = createApi({
  reducerPath: "settings",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pickaxe-server.herokuapp.com/",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json, text/plain, */*");
      headers.set("Access-Control-Allow-Origin", "*");

      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getGlobalMetrics: builder.query({
      query: () => `api/metrics/1`,
      providesTags: ["Users"],
    }),
    getSystemMetrics: builder.query({
      query: (systemID) => `api/metrics/sys/${systemID}`,
    }),
    getSystemList: builder.query({
      query: () => `api/systems/1`,
    }),
    addSystem: builder.mutation({
      query: (body) => {
        return {
          url: `api/systems`,
          method: "POST",
          body,
        };
      },
    }),
    updateGlobalMetrics: builder.mutation({
      query: (body) => ({
        url: `/api/metrics/1`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    updateSystemMetrics: builder.mutation({
      query: (body) => {
        const { metric_id } = body;
        return {
          url: `/api/metrics/${metric_id}`,
          method: "PUT",
          body,
        };
      },
    }),
  }),
});
export const {
  useGetSystemMetricsQuery,
  useGetGlobalMetricsQuery,
  useGetSystemListQuery,
  useAddSystemMutation,
  useUpdateSystemMetricsMutation,
  useUpdateGlobalMetricsMutation,
} = settingsApi;
