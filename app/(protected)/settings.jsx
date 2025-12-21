import { useRouter } from "expo-router";

import ThemedView from "../../src/components/styled/themedView";

import ThemedText from "../../src/components/styled/themedText";

import { useStyles } from "../../src/globalStyle";

import ThemeSelector from "../../src/components/themeSelector";
import ThemedButton from "../../src/components/styled/themedButton";

export default function Settings() {
    const router = useRouter();

    const styles = useStyles();

    return (
        <ThemedView style={styles.page}>
            <ThemedText style={styles.title}>Settings</ThemedText>

            <ThemedText style={styles.subtitle}>Theme</ThemedText>
            <ThemeSelector />

            <ThemedButton onPress={() => router.back()}>&lt; Back</ThemedButton>
        </ThemedView>
    );
}
