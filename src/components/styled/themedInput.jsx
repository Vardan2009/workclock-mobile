import { TextInput } from "react-native";
import { useStyles } from "../../globalStyle";
import { useTheme } from "../../themeCtx";

export default function ThemedInput({ style, ...props }) {
    const styles = useStyles();
    const { theme } = useTheme();

    return (
        <TextInput
            keyboardAppearance={theme.keyboardAppearance || "light"}
            style={[styles.input, style]}
            {...props}
        />
    );
}
