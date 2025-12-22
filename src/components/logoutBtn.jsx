import { useAuth } from "../authCtx";
import { router } from "expo-router";

import ThemedButton from "./styled/themedButton";

import { useState } from "react";

import { Feather } from "@expo/vector-icons";
import { useStyles } from "../globalStyle";

export function LogoutButton() {
    const { logout } = useAuth();

    const styles = useStyles();

    const [loggingOut, setLogoutState] = useState(false);

    return (
        <ThemedButton
            onPress={async () => {
                setLogoutState(true);
                await logout();
                setLogoutState(false);
                router.replace("/(auth)/login");
            }}
            style={styles.buttonSquare}
            disabled={loggingOut}
        >
            <Feather style name="log-out" size={16} />
        </ThemedButton>
    );
}
