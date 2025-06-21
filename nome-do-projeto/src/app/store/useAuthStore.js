import { create } from "zustand";
import axios from "axios";

const API = "https://twitter-clone-api-ebac.fly.dev/api";

export const useAuthStore = create((set) => ({
    user: null,
    loading: false,
    error: null,

    register: async (data) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.post(`${API}/accounts/register/`, data);
            set({ user: res.data });
            return { success: true };
        } catch (err) {
            set({ error: err.response?.data || "Erro desconhecido" });
            return { success: false, error: err.response?.data };
        } finally {
            set({ loading: false });
        }
    },
}));
