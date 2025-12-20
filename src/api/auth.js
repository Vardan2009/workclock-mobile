import { api } from "./client";
import * as SecureStore from "expo-secure-store";

export async function register(username, password) {
    const res = await api.post("/register", { username, password });
    await SecureStore.setItemAsync("access_token", res.data.access_token);
    return res.data;
}

export async function login(username, password) {
    const res = await api.post("/login", { username, password });

    if (res.data.access_token)
        await SecureStore.setItemAsync("access_token", res.data.access_token);

    return res.data;
}

export async function logout() {
    await api.post("/logout");
    await SecureStore.deleteItemAsync("access_token");
}
