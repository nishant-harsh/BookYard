import { useAPI } from "../hooks/useAPI";

//
export const GetCurrentUser = async () => {
  const { get } = useAPI();
  return get("/auth/user");
};
//
export const LoginUserAPI = async (credentials) => {
  const { post } = useAPI();
  return post("/auth/login", credentials);
};
//
export const RegisterUserAPI = async (userData) => {
  const { post } = useAPI();
  return post("/auth/register", userData);
};
//
export const RefreshAccessTokenAPI = async () => {
  const { get } = useAPI();
  return get("/auth/refresh_token");
};
//
export const LogoutUserAPI = async () => {
  const { delete: del } = useAPI();
  return del("/auth/logout");
};
//
export const GetAllUsersAPI = async () => {
  const { get } = useAPI();
  return get("/user/users");
};
//
export const GetBooksAPI = async () => {
  const { get } = useAPI();
  return get("/book/books");
};
//
export const GetBookByIdAPI = async (bookId) => {
  const { get } = useAPI();
  return get(`/book/${bookId}`);
};
//
export const AddBookAPI = async (bookData) => {
  const { post } = useAPI();
  return post("/book/add", bookData);
};
//
export const UpdateBookAPI = async (bookId, bookData) => {
  const { put } = useAPI();
  return put(`/book/${bookId}`, bookData);
};
//
export const ReturnBookAPI = async (bookId) => {
  const { patch } = useAPI();
  return patch(`/book/${bookId}/availability`, { availability: true });
};
//
export const DeleteBookAPI = async (bookId) => {
  const { delete: del } = useAPI();
  return del(`/book/${bookId}`);
};
//
export const GetUserReservationsAPI = async () => {
  const { get } = useAPI();
  return get("/user/reservations");
};
//
export const GetAllReservationsAPI = async () => {
  const { get } = useAPI();
  return get("/user/reservations/all");
};
//
export const UpdateUser = async (userId, data) => {
  const { patch } = useAPI();
  return patch(`/user/edit/${userId}`, data);
};
//
export const UpdateUserRoleAPI = async (userId, role) => {
  const { put } = useAPI();
  return put(`/user/users/${userId}`, { role });
};
//
export const ReserveBookRequestAPI = async (bookId) => {
  const { post } = useAPI();
  return post(`/user/reserve/${bookId}`);
};
//
export const UpdateReservationStatusAPI = async (reservationId, status) => {
  const { patch } = useAPI();
  return patch(`/user/reservations/${reservationId}`, { status });
};
//
export const DeleteBookRequestAPI = async (reservationId) => {
  const { delete: del } = useAPI();
  return del(`/user/reservation/${reservationId}`);
};
//
export const DeleteUserAPI = async (userId) => {
  const { delete: del } = useAPI();
  return del(`/user/users/${userId}`);
};
