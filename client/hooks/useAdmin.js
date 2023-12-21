import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/queryClient";

import {
  DeleteUserAPI,
  GetAllReservationsAPI,
  GetAllUsersAPI,
  UpdateReservationStatusAPI,
  UpdateUserRoleAPI,
} from "../utils/api";
import toast from "react-hot-toast";

export function useGetAllUsers() {
  const {
    data: allUsersData,
    isError,
    isPending,
    error,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: GetAllUsersAPI,
    onError: (error) => {
      console.error("Error fetching all users details:", error);
      throw new Error("Error fetching all users details");
    },
  });

  return {
    allUsersData,
    totalUsers: allUsersData?.length,
    allUsersLoading: isPending,
    allUsersError: isError,
    allUsersErrorMessage: error?.message || "",
  };
}

export function useAllReservation() {
  const { data, isError, isPending, error } = useQuery({
    queryKey: ["all-reservations"],
    queryFn: GetAllReservationsAPI,
    onError: (error) => {
      console.error("Error fetching all reservation history:", error);
      throw new Error("Error fetching all reservation history");
    },
  });

  return {
    allReservationData: data,
    totalReservations: data?.length,
    pendingReservation: data?.filter((item) => item.status === "Pending")
      ?.length,
    reservationsLoding: isPending,
    reservationsError: isError,
    reservationsErrorMessage: error?.message || "",
  };
}

export function useUpdateRole() {
  return useMutation({
    mutationFn: ({ userId, role }) => UpdateUserRoleAPI(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
      toast.success("User role updated successfully.", {
        duration: 6000,
        position: "bottom-center",
      });
    },
    onError: (error) => {
      console.error("Error in updating user role:", error);
      throw new Error("Error in updating user role");
    },
  });
}

export function useReservationStatus() {
  return useMutation({
    mutationFn: ({ reservationId, status }) =>
      UpdateReservationStatusAPI(reservationId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-reservations"] });
      toast.success("Reservation status updated successfully.", {
        duration: 6000,
        position: "bottom-center",
      });
    },
    onError: () => {
      console.error("Error in updating reservation status");
      throw new Error("Error in updating reservation status.");
    },
  });
}

export function useDeleteUser() {
  return useMutation({
    mutationFn: (userId) => DeleteUserAPI(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
      toast.success("User deleted successfully.", {
        duration: 6000,
        position: "bottom-center",
      });
    },
    onError: () => {
      console.error("Error in deleting user");
      throw new Error("Error in deleting user");
    },
  });
}
