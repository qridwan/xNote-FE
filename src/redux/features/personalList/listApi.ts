import { apiSlice as api } from "../../api/apiSlice";

const listApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addWishList: builder.mutation({
      query: (data) => ({
        url: `/wishlist`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["list"],
    }),
    getWishlist: builder.query({
      query: () => `/wishlist`,
      providesTags: ["list"],
    }),
    addReadingList: builder.mutation({
      query: (data) => ({
        url: `/reading`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["list"],
    }),
    getReadingList: builder.query({
      query: () => `/reading`,
      providesTags: ["list"],
    }),
    deleteReading: builder.mutation({
      query: (id: string) => ({
        url: `/reading/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["list"],
    }),
    deleteWishlist: builder.mutation({
      query: (id: string) => ({
        url: `/wishlist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["list"],
    }),
  }),
});

export const {
  useAddWishListMutation,
  useGetWishlistQuery,
  useDeleteWishlistMutation,
  useAddReadingListMutation,
  useGetReadingListQuery,
  useDeleteReadingMutation,
} = listApi;
