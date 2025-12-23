import { useAuth } from "../authCtx";
import { router } from "expo-router";

import ThemedButton from "./styled/themedButton";

import { useState } from "react";

import { Feather } from "@expo/vector-icons";
import { useStyles } from "../globalStyle";

import { useTheme } from "../themeCtx";

export default function LogoutButton() {
    const { logout } = useAuth();

    const { theme } = useTheme();

    const [loggingOut, setLogoutState] = useState(false);

    return (
        <ThemedButton
            onPress={async () => {
                setLogoutState(true);
                await logout();
                setLogoutState(false);
                router.replace("/(auth)/login");
            }}
            style={{ backgroundColor: theme.danger }}
            disabled={loggingOut}
        >
            Log out <Feather style name="log-out" size={16} />
        </ThemedButton>
    );
}
