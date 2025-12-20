import { useStyles } from "../src/globalStyle";

import ThemeSelector from "../src/components/themeSelector";

import ThemedView from "../src/components/styled/themedView";
import ThemedText from "../src/components/styled/themedText";

export default function HomeScreen() {
    const styles = useStyles();

    return (
        <ThemedView style={styles.page}>
            <ThemedText style={styles.text}>Hello</ThemedText>
            <ThemeSelector />
        </ThemedView>
    );
}
