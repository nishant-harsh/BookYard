import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/queryClient";

import {
  AddBookAPI,
  DeleteBookAPI,
  DeleteBookRequestAPI,
  GetBookByIdAPI,
  GetBooksAPI,
  GetUserReservationsAPI,
  ReserveBookRequestAPI,
  ReturnBookAPI,
  UpdateBookAPI,
} from "../utils/api";
import toast from "react-hot-toast";

export function useOneBook(bookId) {
  return useQuery({
    queryKey: ["book", bookId],
    queryFn: ({ queryKey }) => GetBookByIdAPI(queryKey[1]),
    retry: 1,
    onError: (error) => {
      console.error("Error fetching book details:", error);
      throw new Error("Error fetching book details");
    },
  });
}

export function useBooks() {
  const {
    data: books,
    isPending: booksLoading,
    isError: booksError,
  } = useQuery({
    queryKey: ["books"],
    queryFn: GetBooksAPI,
    retry: 1,
    onError: (error) => {
      console.error("Error fetching books:", error);
      throw new Error("Error fetching books");
    },
  });

  return {
    books: books || [],
    booksLoading,
    booksError,
  };
}

export function useReserveBook() {
  return useMutation({
    mutationFn: (bookId) => ReserveBookRequestAPI(bookId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["books", variables.bookId] });
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["reservedBooks"] });
      toast.success("Successfully requested to book it.", {
        duration: 6000,
        position: "bottom-center",
      });
    },
    onError: (error, variables, rollback) => {
      toast.error("Book unavailable", {duration: 6000, position: "bottom-center"});
      console.error("Error during book reservation:", error);
      rollback();
      throw new Error("Error during book reservation");
    },
    onMutate: (newReservation) => {
      queryClient.cancelQueries({ queryKey: ["books"] });
      const previousData = queryClient.getQueryData(["books"]);
      queryClient.setQueryData(["books"], (old) => {
        return old?.map((book) =>
          book.id === newReservation.bookId
            ? { ...book, available: false }
            : book
        );
      });
      return () => queryClient.setQueryData(["books"], previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    retry: false,
  });
}

export function useReturnBook() {
  return useMutation({
    mutationFn: (bookId) => ReturnBookAPI(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["reservedBooks"] });
      toast.success("Book returned successfully.", {
        duration: 6000,
        position: "bottom-center",
      });
    },
    onError: (error, variables, rollback) => {
      console.error("Error during book return:", error);
      rollback();
      throw new Error("Error during book return");
    },
    onMutate: (returnedBook) => {
      queryClient.cancelQueries("books");
      const previousData = queryClient.getQueryData(["books"]);
      queryClient.setQueryData(["books"], (old) => {
        return old?.map((book) =>
          book.id === returnedBook.bookId ? { ...book, available: true } : book
        );
      });
      return () => queryClient.setQueryData(["books"], previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
}

export function useAddBook() {
  return useMutation({
    mutationFn: (bookData) => AddBookAPI(bookData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Book added successfully.", {
        duration: 6000,
        position: "bottom-center",
      });
    },
    onError: (error) => {
      console.error("Error adding book:", error);
      throw new Error("Error adding book");
    },
  });
}

export function useUpdateBook() {
  return useMutation({
    mutationFn: ({ bookId, bookData }) => UpdateBookAPI(bookId, bookData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Book updated successfully.", {
        duration: 6000,
        position: "bottom-center",
      });
    },
    onError: (error) => {
      console.error("Error updating book:", error);
      throw new Error("Error updating book");
    },
  });
}

export function useDeleteBook() {
  return useMutation({
    mutationFn: (bookId) => DeleteBookAPI(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Book deleted successfully.", {
        duration: 6000,
        position: "bottom-center",
      });
    },
    onError: (error) => {
      console.error("Error deleting book:", error);
      throw new Error("Error deleting book");
    },
  });
}

export function useDeleteBookRequest() {
  return useMutation({
    mutationFn: (reservationId) => DeleteBookRequestAPI(reservationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservedBooks"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Book request cancelled successfully.", {
        duration: 6000,
        position: "bottom-center",
      });
    },
    onError: (error) => {
      toast.error("Book unavailable", {duration: 6000, position: "bottom-center"});
      console.error("Error deleting book request:", error);
      throw new Error("Error deleting book request");
    },
    retry: false,
  });
}

export function useReservedBooks() {
  return useQuery({
    queryKey: ["reservedBooks"],
    queryFn: GetUserReservationsAPI,
    onError: (error) => {
      console.error("Error fetching reserved books:", error);
      throw new Error("Error fetching reserved books");
    },
    retry: 2,
  });
}
