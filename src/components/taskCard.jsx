import ThemedText from "./styled/themedText";
import ThemedView from "./styled/themedView";

import { useStyles } from "../globalStyle";

import { useTheme } from "../themeCtx";

export default function TaskCard({ task }) {
    const styles = useStyles();
    const { theme } = useTheme();

    return (
        <ThemedView
            style={{
                flexDirection: "column",
                justifyContent: "center",
                padding: 16,
                marginTop: 8,
                borderRadius: 5,
                backgroundColor: theme.bgAlt,
            }}
        >
            <ThemedText style={styles.subtitle}>{task.title}</ThemedText>
            <ThemedText>{task.description}</ThemedText>
        </ThemedView>
    );
}
