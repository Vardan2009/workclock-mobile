import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        SecureStore.getItemAsync("access_token").then((token) => {
            setAuthenticated(!!token);
            setLoading(false);
        });
    }, []);

    const login = () => setAuthenticated(true);

    const logout = async () => {
        await SecureStore.deleteItemAsync("access_token");
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, isLoading, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
