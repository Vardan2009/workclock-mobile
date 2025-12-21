import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../src/authCtx";

import { TasksProvider } from "../../src/task";

export default function ProtectedLayout() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return null;

    if (!isAuthenticated) {
        return <Redirect href="/(auth)/login" />;
    }

    return (
        <TasksProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: "fade",
                    gestureEnabled: false,
                }}
            ></Stack>
        </TasksProvider>
    );
}
