import { useRouter } from "expo-router";

import ThemedView from "../../src/components/styled/themedView";
import ThemedText from "../../src/components/styled/themedText";
import ThemedPressable from "../../src/components/styled/themedPressable";

import { useStyles } from "../../src/globalStyle";
import { useTheme } from "../../src/themeCtx";

import ThemeSelector from "../../src/components/themeSelector";
import ThemedButton from "../../src/components/styled/themedButton";

import { Feather } from "@expo/vector-icons";

import { Linking } from "react-native";

export default function Settings() {
    const router = useRouter();

    const styles = useStyles();
    const { theme } = useTheme();

    return (
        <ThemedView style={styles.page}>
            <ThemedText style={styles.title}>Settings</ThemedText>

            <ThemedText style={styles.subtitle}>Theme</ThemedText>
            <ThemeSelector />

            <ThemedButton onPress={() => router.back()}>
                <Feather name="arrow-left" size={16} /> Back
            </ThemedButton>

            <ThemedText style={{ marginTop: 100, opacity: 0.5 }}>
                WorkClock version v0.1.0
            </ThemedText>

            <ThemedPressable
                onPress={() => {
                    Linking.openURL("https://github.com/Vardan2009/workclock");
                }}
            >
                <ThemedText style={{ color: theme.accent1 }}>
                    GitHub (workclock)
                </ThemedText>
            </ThemedPressable>
            <ThemedPressable
                onPress={() => {
                    Linking.openURL(
                        "https://github.com/Vardan2009/workclock-mobile"
                    );
                }}
            >
                <ThemedText style={{ color: theme.accent1 }}>
                    GitHub (workclock-mobile)
                </ThemedText>
            </ThemedPressable>
        </ThemedView>
    );
}
