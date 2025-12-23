import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../src/authCtx";

import { TasksProvider } from "../../src/task";
import { UserDataProvider } from "../../src/userDataCtx";

export default function ProtectedLayout() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return null;

    if (!isAuthenticated) {
        return <Redirect href="/(auth)/login" />;
    }

    return (
        <UserDataProvider>
            <TasksProvider>
                <Stack
                    screenOptions={{
                        headerShown: false,
                        animation: "fade_from_bottom",
                        gestureEnabled: false,
                        animationDuration: 100,
                    }}
                ></Stack>
            </TasksProvider>
        </UserDataProvider>
    );
}
