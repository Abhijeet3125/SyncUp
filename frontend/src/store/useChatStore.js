import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });

        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser } = get();
    
        // Optimistically add the message to state before API response
        const tempMessage = {
            ...messageData,
            senderId: useAuthStore.getState().authUser._id, // Ensure correct sender ID
            _id: Date.now().toString(), // Temporary unique ID
            createdAt: new Date().toISOString(), // Add timestamp
        };
    
        set((state) => ({ messages: [...state.messages, tempMessage] }));
    
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
    
            // Replace the temporary message with the actual response
            set((state) => ({
                messages: state.messages.map((msg) =>
                    msg._id === tempMessage._id ? res.data : msg
                ),
            }));
        } catch (error) {
            toast.error(error.response.data.message);
            // Optionally remove the temp message on failure
            set((state) => ({
                messages: state.messages.filter((msg) => msg._id !== tempMessage._id),
            }));
        }
    },    

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;
    
        const socket = useAuthStore.getState().socket;
        if (!socket) return;
    
        socket.off("newMessage"); // Prevent duplicate listeners
    
        socket.on("newMessage", (newMessage) => {
            if (newMessage.senderId !== selectedUser._id && newMessage.receiverId !== selectedUser._id) return;
    
            set((state) => ({
                messages: [...state.messages, newMessage],
            }));
        });
    },
    

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },
    // optimise later
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}))