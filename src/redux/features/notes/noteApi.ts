import { noteType } from "../../../types/note";
import { apiSlice as api } from "../../api/apiSlice";

const noteApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getnotes: builder.query({
      query: ({
        searchTerm,
      }: // category,
      {
        searchTerm?: string;
        category?: string;
      }) => `/notes?searchTerm=${searchTerm ?? ""}`,
      providesTags: ["notes"],
    }),
    getnotesbyfolder: builder.query({
      query: ({
        searchTerm,
        id,
      }: // category,
      {
        searchTerm?: string;
        id: string;
      }) => `/notes/notebook/${id}?searchTerm=${searchTerm ?? ""}`,
      providesTags: ["notes"],
    }),
    singlenote: builder.query({
      query: (id: string) => `/notes/${id}`,
    }),
    featurednote: builder.query({
      query: () => `/note/featured`,
      providesTags: ["notes"],
    }),
    tagList: builder.query({
      query: () => `/tags`,
    }),
    deletenote: builder.mutation({
      query: (id: string) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notes", "trash"],
    }),
    addnote: builder.mutation({
      query: (data: noteType) => ({
        url: `/notes/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["notes"],
    }),
    editnote: builder.mutation({
      query: (data: noteType) => ({
        url: `/notes/edit`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["notes"],
    }),
    addReview: builder.mutation({
      query: (data: {
        review: string;
        noteId: string;
        reviewerId: string;
      }) => ({
        url: `/review`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
    getReviews: builder.query({
      query: (id: string) => `/review/${id}`,
      providesTags: ["reviews"],
    }),
  }),
});

export const {
  useDeletenoteMutation,
  useGetnotesQuery,
  useSinglenoteQuery,
  useFeaturednoteQuery,
  useAddnoteMutation,
  useGetReviewsQuery,
  useAddReviewMutation,
  useEditnoteMutation,
  useGetnotesbyfolderQuery,
} = noteApi;
