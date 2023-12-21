import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/queryClient";
import {
  GetCurrentUser,
  LoginUserAPI,
  LogoutUserAPI,
  RefreshAccessTokenAPI,
  RegisterUserAPI,
  UpdateUser,
} from "../utils/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useSignUp() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => RegisterUserAPI(data),
    onSuccess: () => {
      toast.success("Account created successfully", {
        duration: 6000,
        position: "bottom-center",
      });
      // Redirect to the login page after sign-up
      navigate("/login");
    },
    onError: (error) => {
      console.log("Error during signup:", error);
      throw new Error("Error during signup");
    },
  });
}

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => LoginUserAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Logged In successfully.", {
        duration: 6000,
        position: "bottom-center",
      });
      navigate("/");
    },
    onError: (error) => {
      console.log("Error during login:", error);
      throw new Error("Error during Login");
    },
  });
}

export function useCurrentUser() {
  const {
    data: user,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: GetCurrentUser,
    refetchOnWindowFocus: false,
    retry: false,
    onError: (error) => {
      console.error("Error fetching current user:", error);
      throw new Error("Error fetching current user");
    },
  });

  return {
    user,
    isPending,
    isError,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role === "Admin",
    refetchCurrentUser: refetch,
  };
}

export function useLogOut() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: LogoutUserAPI,
    onSuccess: () => {
      toast.success("Logged Out successfully.", {
        duration: 6000,
        position: "bottom-center",
      });
      navigate("/login");
      window.location.reload();
    },
    onError: (error) => {
      console.error("Error during logout:", error);
      throw new Error("Error during logout");
    },
  });
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: RefreshAccessTokenAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error) => {
      console.error("Error during token refresh:", error);
      throw new Error("Error during token refresh");
    },
  });
}

export function useEditProfile() {
  return useMutation({
    mutationFn: ({ userId, data }) => UpdateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Profile updated successfully.", {
        duration: 5000,
        position: "bottom-center",
      });
    },
    onError: (error) => {
      console.error("Error during editing profile:", error);
      throw new Error("Error during editing profile");
    },
  });
}
