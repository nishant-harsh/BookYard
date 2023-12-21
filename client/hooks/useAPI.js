import axios from "axios";
import { useRefreshToken } from "./useAuth";
import toast from "react-hot-toast";

const baseURL = import.meta.env.VITE_BASE_URL; // Adjust this based on your API endpoint

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.status === 401 || error.status === 403) {
      useRefreshToken().mutate();
    }

    return Promise.reject(error);
  }
);

export function useAPI() {
  const request = async (config) => {
    try {
      const response = await api(config);
      return response.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Network error, try again after sometime.", {
          duration: 6000,
          position: "bottom-center",
        });
      }
      if (error?.response?.status === 500) {
        toast.error("Server Error, please contact admin!", {
          duration: 6000,
          position: "bottom-center",
        });
      } else if (
        error?.response?.status !== 400 &&
        error?.response?.status !== 401 &&
        error?.response?.statusText
      ) {
        toast.error(`${error.response.status} ${error.response.statusText}`, {
          duration: 6000,
          position: "bottom-center",
        });
      }
      throw new Error(error);
    }
  };

  return {
    get: async (url) => await request({ method: "get", url }),
    post: async (url, data) => await request({ method: "post", url, data }),
    put: async (url, data) => await request({ method: "put", url, data }),
    patch: async (url, data) => await request({ method: "patch", url, data }),
    delete: async (url) => await request({ method: "delete", url }),
  };
}
