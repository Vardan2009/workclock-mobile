import { Redirect, Slot } from "expo-router";
import { useAuth } from "../../src/authCtx";

export default function ProtectedLayout() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return null;

    if (!isAuthenticated) {
        return <Redirect href="/(auth)/login" />;
    }

    return <Slot />;
}
