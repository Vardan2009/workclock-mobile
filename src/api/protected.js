import { api } from "./client";

export async function getUser() {
    const res = await api.get("/user");
    return res.data;
}

export async function getTasks() {
    const res = await api.get("/tasks");
    return res.data;
}
