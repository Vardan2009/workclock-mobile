import { login as apiLogin } from "../../src/api/auth";
import { useAuth } from "../../src/authCtx";
import { useRouter } from "expo-router";

import { useState, useEffect } from "react";

import { useStyles } from "../../src/globalStyle";

import ThemedView from "../../src/components/styled/themedView";
import ThemedButton from "../../src/components/styled/themedButton";

import ThemedText from "../../src/components/styled/themedText";

import ThemedInput from "../../src/components/styled/themedInput";

import { Pressable } from "react-native";

import { useTheme } from "../../src/themeCtx";

const formatString = (str) => {
    const lowerCaseStr = str.toLowerCase();
    const noSpaceStr = lowerCaseStr.replace(/\s/g, "");
    return noSpaceStr.replace(/[^a-zA-Z0-9\\s]/g, "");
};

export default function Login() {
    const { login, isAuthenticated } = useAuth();
    const { theme } = useTheme();

    const styles = useStyles();

    const router = useRouter();

    const [loggingIn, setLoginState] = useState(false);

    const [error, setError] = useState(null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isAuthenticated) router.replace("/(protected)");
    }, [isAuthenticated]);

    const handleLogin = async () => {
        setLoginState(true);
        setError(null);
        const data = await apiLogin(username, password);
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
            <ThemedText style={styles.title}>Log in</ThemedText>
            <Pressable onPress={() => router.push(`/(auth)/register`)}>
                <ThemedText style={{ color: theme.accent1 }}>
                    No account? Register
                </ThemedText>
            </Pressable>

            <ThemedInput
                placeholder="Username"
                value={username}
                onChangeText={(t) => setUsername(formatString(t))}
            />

            <ThemedInput
                secureTextEntry={true}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
            />

            <ThemedButton
                textStyle={{ fontSize: 24 }}
                onPress={handleLogin}
                disabled={loggingIn}
            >
                Log in
            </ThemedButton>
            {error && <ThemedText>{error}</ThemedText>}
        </ThemedView>
    );
}
