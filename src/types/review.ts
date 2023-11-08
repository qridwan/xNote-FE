export default interface IReview {
  _id: string;
  review: string;
  reviewerId: {
    _id: string;
    fullName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  };
  bookId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}
