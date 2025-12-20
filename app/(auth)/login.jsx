import { login as apiLogin } from "../../src/api/auth";
import { useAuth } from "../../src/authCtx";
import { useRouter } from "expo-router";

import { useState } from "react";

import ThemedView from "../../src/components/styled/themedView";
import ThemedButton from "../../src/components/styled/themedButton";

import ThemedText from "../../src/components/styled/themedText";

export default function Login() {
    const { login } = useAuth();

    const router = useRouter();

    const [loggingIn, setLoginState] = useState(false);

    const [error, setError] = useState(null);

    const handleLogin = async () => {
        setLoginState(true);
        setError(null);
        const data = await apiLogin("john", "secret");
        setLoginState(false);
        if (data.error) {
            setError(data.error);
            return;
        }
        login();
        router.replace("/(protected)");
    };

    return (
        <ThemedView>
            <ThemedButton onPress={handleLogin} disabled={loggingIn}>
                Log in{" "}
            </ThemedButton>
            {error && <ThemedText>{error}</ThemedText>}
        </ThemedView>
    );
}
