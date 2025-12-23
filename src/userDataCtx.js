import { createContext, useCallback, useContext, useState } from "react";
import { api } from "./api/client";

const UserContext = createContext(null);

export function UserDataProvider({children}) {
    const [userData, setUserData] = useState(null);

    const loadUserData = useCallback(async () => {
        const data = await api.get(`/user`);
        setUserData(data.data);
    });

    const value = {
        userData,
        setUserData,
        loadUserData
    }

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}

export function useUserData() {
    const context = useContext(UserContext);
    
    if (!context) {
        throw new Error("useTasks must be used within a TasksProvider");
    }
    
    return context;
}