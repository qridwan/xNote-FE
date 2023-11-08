import { bookType } from "../../../types/note";
import { apiSlice as api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getbooks: builder.query({
      query: ({
        searchTerm,
        genre,
        publication,
      }: {
        searchTerm?: string;
        genre?: string;
        publication?: string;
      }) =>
        `/book?searchTerm=${searchTerm ?? ""}&genre=${
          genre ?? ""
        }&publication=${publication ?? ""}`,
      providesTags: ["books"],
    }),
    singlebook: builder.query({
      query: (id: string) => `/book/${id}`,
      providesTags: ["list", "books"],
    }),
    featuredbook: builder.query({
      query: () => `/book/featured`,
      providesTags: ["books"],
    }),
    genreList: builder.query({
      query: () => `/book/allGenre`,
    }),
    deletebook: builder.mutation({
      query: (id: string) => ({
        url: `/book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
    addbook: builder.mutation({
      query: (data: bookType) => ({
        url: `/book`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    editbook: builder.mutation({
      query: ({ data, id }: { data: bookType; id: string }) => ({
        url: `/book/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    addReview: builder.mutation({
      query: (data: {
        review: string;
        bookId: string;
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
  useDeletebookMutation,
  useGetbooksQuery,
  useSinglebookQuery,
  useFeaturedbookQuery,
  useAddbookMutation,
  useGetReviewsQuery,
  useAddReviewMutation,
  useGenreListQuery,
  useEditbookMutation,
} = bookApi;
