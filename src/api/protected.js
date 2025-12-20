import { api } from "./client";

export async function getUser() {
    const res = await api.get("/user");
    return res.data;
}
