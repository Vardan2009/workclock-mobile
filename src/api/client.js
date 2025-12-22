import axios from "axios";
import * as SecureStore from "expo-secure-store";

import { router } from "expo-router";

const API_URL = "https://time-manager-app-backend.onrender.com";

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    validateStatus: () => true,
});

api.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (error.response?.status === 401) {
            console.error("401 unauth");
            await SecureStore.deleteItemAsync("access_token");
            router.replace("/(auth)/login");
        }
        return Promise.reject(error);
    }
);
