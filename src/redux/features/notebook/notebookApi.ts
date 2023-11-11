import { notebookType } from "../../../types/notebook";
import { apiSlice as api } from "../../api/apiSlice";

const notebookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getnotebook: builder.query({
      query: () => `/notebooks`,
      providesTags: ["notebook"],
    }),
    singlenotebook: builder.query({
      query: (id: string) => `/notebooks/${id}`,
    }),
    deletenotebook: builder.mutation({
      query: (id: string) => ({
        url: `/notebooks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notebook"],
    }),
    addnotebook: builder.mutation({
      query: (data: notebookType) => ({
        url: `/notebooks/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["notebook"],
    }),
    editnotebook: builder.mutation({
      query: (data: notebookType) => ({
        url: `/notebooks/edit`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["notebook"],
    }),
  }),
});

export const {
  useDeletenotebookMutation,
  useSinglenotebookQuery,
  useAddnotebookMutation,
  useEditnotebookMutation,
  useGetnotebookQuery,
} = notebookApi;
