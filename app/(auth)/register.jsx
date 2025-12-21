import { register as apiRegister } from "../../src/api/auth";
import { useAuth } from "../../src/authCtx";
import { useRouter } from "expo-router";

import { useState } from "react";

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

export default function Register() {
    const { theme } = useTheme();

    const styles = useStyles();

    const router = useRouter();

    const [loggingIn, setLoginState] = useState(false);

    const [error, setError] = useState(null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        setLoginState(true);
        setError(null);
        const data = await apiRegister(username, password);
        setLoginState(false);
        if (data.error) {
            setError(data.error);
            return;
        }
        router.replace("/(auth)/login");
    };

    return (
        <ThemedView>
            <ThemedText style={styles.title}>Register</ThemedText>
            <Pressable onPress={() => router.push(`/(auth)/login`)}>
                <ThemedText style={{ color: theme.accent1 }}>
                    Already have an account? Log in
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
                Register
            </ThemedButton>
            {error && <ThemedText>{error}</ThemedText>}
        </ThemedView>
    );
}
