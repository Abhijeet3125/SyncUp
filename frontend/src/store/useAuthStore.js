import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import axios from "axios";
import toast from "react-hot-toast";
import { data } from "react-router-dom";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,


    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("auth/check");

            set({ authUser: res.data });

        } catch (error) {
            console.log("error in checkAuth", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (data) => {
        set({ isSigningUp: true });
        try {

            const response = await axiosInstance.post("/auth/signup", data);
            toast.success("Account creted successfully");
            set({ authUser: res.data });

        } catch (error) {
            toast.error(error.response.data.message);

        } finally {
            set({ isSigningUp: false });
        }
    },

    logout: async (data) => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("successfully logged out");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}));