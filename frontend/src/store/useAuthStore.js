import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import axios from "axios";
import toast from "react-hot-toast";
import { data } from "react-router-dom";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development"
    ? "http://localhost:5001"
    : ""; // ✅ Use relative path in production


export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    isCheckingAuth: true,
    socket: null,


    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("auth/check");

            set({ authUser: res.data });
            get().connectSocket();

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
            get().connectSocket();
            set({ authUser: response.data });

        } catch (error) {
            toast.error(error.response.data.message);

        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {

        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            toast.success("Logged in successfully");
            set({ authUser: res.data });

            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });

        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("error in update profile", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false })
        }

    },

    logout: async (data) => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("successfully logged out");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    connectSocket: () => {

        const { authUser } = get();

        if (!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            }
        });
        socket.connect();

        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        })
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },

}));