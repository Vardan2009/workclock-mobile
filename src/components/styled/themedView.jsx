import { SafeAreaView } from "react-native";
import { useTheme } from "../../themeCtx";

export default function ThemedView({ style, ...props }) {
    const { theme } = useTheme();

    return (
        <SafeAreaView
            style={[{ backgroundColor: theme.bg }, style]}
            {...props}
        />
    );
}
