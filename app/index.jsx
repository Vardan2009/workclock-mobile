import { Redirect } from "expo-router";
import { useAuth } from "../src/authCtx";

export default function Index() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return null;

    if (isAuthenticated) {
        return <Redirect href="/(protected)" />;
    }

    return <Redirect href="/(auth)/login" />;
}
