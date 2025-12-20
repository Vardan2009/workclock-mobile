import { useAuth } from "../authCtx";
import { router } from "expo-router";

import ThemedButton from "./styled/themedButton";

import { useState } from "react";

export function LogoutButton() {
    const { logout } = useAuth();

    const [loggingOut, setLogoutState] = useState(false);

    return (
        <ThemedButton
            onPress={async () => {
                setLogoutState(true);
                await logout();
                setLogoutState(false);
                router.replace("/(auth)/login");
            }}
            disabled={loggingOut}
        >
            Log out
        </ThemedButton>
    );
}
