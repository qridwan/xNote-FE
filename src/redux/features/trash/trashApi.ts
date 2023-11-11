import { trashType } from "../../../types/trash";
import { apiSlice as api } from "../../api/apiSlice";

const trashApi = api.injectEndpoints({
  endpoints: (builder) => ({
    gettrash: builder.query({
      query: ({
        searchTerm,
      }: // category,
      {
        searchTerm?: string;
        category?: string;
      }) => `/trash?searchTerm=${searchTerm ?? ""}`,
      providesTags: ["trash"],
    }),
    deletetrash: builder.mutation({
      query: (id: string) => ({
        url: `/trash/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["trash", "notes"],
    }),
    addtrash: builder.mutation({
      query: (data: trashType) => ({
        url: `/trash/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["trash", "notes"],
    }),
  }),
});

export const { useDeletetrashMutation, useGettrashQuery, useAddtrashMutation } =
  trashApi;
